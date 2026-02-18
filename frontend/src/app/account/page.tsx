"use client";

import { AppError } from "@/lib/core/errors/AppError";
import { AccountService } from "@/lib/modules/account/account.service";
import { AuthService } from "@/lib/modules/auth/auth.service";
import InputRow from "@/ui/InputRow";
import LinkButton from "@/ui/LinkButton";
import { useNotification } from "@/utils/useNotification";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { PiUserCircleDuotone } from "react-icons/pi";

type Profile = {
  name: string;
  username: string;
  address: string;
  image: string;
  userType: string;
  phone?: string;
  email?: string;
  password?: string;
};

const defaultProfile: Profile = {
  name: "",
  username: "",
  address: "",
  image: "/images/default-user.jpg",
  userType: "",
  phone: "",
  email: "",
  password: "",
};
type FileInputProps = {
  label: string;
  inputName: string;
  onFileSelect: (file: File) => void;
  isFileUploaded: Boolean;
};

function FileInput({
  label,
  inputName,
  onFileSelect,
  isFileUploaded,
}: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const selectedFile = e.target.files[0];
    onFileSelect(selectedFile);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="font-medium text-stone-700">{label}</label>

      <input
        type="file"
        id={inputName}
        name={inputName}
        onChange={handleSelect}
        className="hidden"
        accept="image/png"
      />

      <label
        htmlFor={inputName}
        className={`
                    cursor-pointer flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 text-stone-500
                    hover:border-primary hover:text-primary transition-colors duration-200
                    ${isFileUploaded === false ? "bg-white" : "bg-green-50 border-green-400 text-green-600"}
                  `}
      >
        {isFileUploaded === false && "انتخاب فایل"}
        {isFileUploaded === true && "✅ آپلود انجام شد"}
      </label>

      {preview && (
        <div className="flex items-center gap-4 mt-2">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-stone-300 shadow-sm">
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Page() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<Boolean>(false);

  const notification = useNotification();

  async function handle_user_data() {
    try {
      const response = await AccountService.get_user_data();
      const userType = response.admin === "1" ? "ادمین" : "کاربر عادی";

      setProfile({
        name: response.name,
        username: response.username,
        address: response.address || "",
        image: response.profile || "/images/default-user.jpg",
        userType,
        phone: response.phone || "",
        email: response.email || "",
        password: "",
      });

      console.log(response.profile);
    } catch (error: any) {
      notification.error(error?.message || "خطا در دریافت اطلاعات کاربر");
    }
  }

  useEffect(() => {
    try {
      AuthService.requireAuth();
      handle_user_data();
    } catch (error) {
      if (error instanceof AppError) {
        notification.error(error.message);
        redirect("/auth/signin");
      } else {
        notification.error("خطای غیرمنتظره‌ای رخ داد");
        redirect("/auth/signin");
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let profileUrl = profile.image;

      if (selectedFile) {
        const { publicUrl } = await AccountService.upload_file(selectedFile);
        profileUrl = publicUrl;
      }

      setIsFileUploaded(true);

      const dataToSend = {
        name: profile.name || undefined,
        username: profile.username || undefined,
        address: profile.address || undefined,
        phone: profile.phone || undefined,
        email: profile.email || undefined,
        profile: profileUrl || undefined,
        password: profile.password || undefined,
      };

      await AccountService.update_user_data(dataToSend);

      notification.success("اطلاعات کاربر با موفقیت به‌روز شد");
    } catch (error: any) {
      notification.error(error?.message || "خطا در آپدیت اطلاعات");
    }
  };

  return (
    <div>
      <div className="flex justify-between p-3 bg-primary">
        <h2 className="gap-1 flex items-center text-xl text-white">
          <span className="*:size-10">
            <PiUserCircleDuotone />
          </span>
          <span className="font-medium">حساب کاربری</span>
        </h2>
        <LinkButton href="/" variation="btn-light">
          صفحه اصلی
        </LinkButton>
      </div>

      <div className="p-5 grid gap-5 items-start md:grid-cols-[20rem_1fr]">
        <div className="p-5 bg-white rounded-xl border border-stone-200 flex flex-col items-center">
          <div className="relative size-25 rounded-full overflow-hidden">
            <img
              className="bg-cover"
              src={profile.image}
              alt="image of the user"
            />
          </div>
          <h3 className="text-xl font-medium text-stone-800 mt-2">
            {profile.username}
          </h3>
          <span className="bg-stone-200 rounded-sm p-1 text-xs text-stone-600">
            {profile.userType}
          </span>
          <div className="mt-5 w-full flex flex-col items-center gap-2 *:w-full">
            <LinkButton href="/production-form" size="btn-lg">
              <span>ارتقای حساب به تولیدی</span>
            </LinkButton>
            <LinkButton href="/auth/logout" variation="btn-danger-light">
              <span className="*:size-5">
                <HiArrowRightStartOnRectangle />
              </span>
              <span>خروج از حساب</span>
            </LinkButton>
          </div>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-xl">
          <form onSubmit={handleSubmit}>
            <div className="gap-y-2 gap-x-5 grid grid-cols-1 lg:grid-cols-2">
              <InputRow label="نام کاربری" htmlFor="username">
                <input
                  className="input-light bg-stone-50"
                  type="text"
                  name="username"
                  id="username"
                  value={profile.username}
                  placeholder="نام کاربری"
                  onChange={handleChange}
                />
              </InputRow>

              <InputRow label="نام و نام خانوادگی" htmlFor="name">
                <input
                  className="input-light bg-stone-50"
                  name="name"
                  id="name"
                  type="text"
                  value={profile.name}
                  placeholder="نام و نام خانوادگی"
                  onChange={handleChange}
                />
              </InputRow>

              <FileInput
                label="تصویر حساب"
                inputName="userImage"
                onFileSelect={(file) => setSelectedFile(file)}
                isFileUploaded={isFileUploaded}
              />

              <InputRow label="شماره تماس (اختیاری)">
                <input
                  className="input-light bg-stone-50"
                  type="tel"
                  name="phone"
                  id="tel"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </InputRow>

              <InputRow label="ایمیل (اختیاری)">
                <input
                  className="input-light bg-stone-50"
                  type="email"
                  name="email"
                  id="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </InputRow>

              <InputRow label="ادرس" htmlFor="address">
                <textarea
                  className="input-light bg-stone-50"
                  name="address"
                  id="address"
                  value={profile.address}
                  placeholder="ادرس"
                  onChange={handleChange}
                />
              </InputRow>

              <InputRow label="کلمه عبور" htmlFor="password">
                <input
                  className="input-light bg-stone-50"
                  name="password"
                  id="password"
                  type="password"
                  value={profile.password}
                  placeholder="کلمه عبور"
                  onChange={handleChange}
                />
                <p>
                  در صورت نیاز به تغییر کلمه عبور. کلمه عبور جدید را وارد کنید
                </p>
              </InputRow>
            </div>
            <div className="mt-5 flex gap-2 justify-end">
              <button
                type="submit"
                className="
                  bg-primary text-white font-medium
                  px-6 py-3 rounded-lg
                  hover:bg-primary-dark
                  shadow-md hover:shadow-lg
                  transition-all duration-200
                "
              >
                ذخیره اطلاعات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
