import { z } from "zod";

export const SigninDto = z.object({
  username: z
    .string({ message: "نام کاربری الزامی است" })
    .min(5, "نام کاربری باید حداقل 5 کاراکتر باشد")
    .max(12, "نام کاربری حداکثر میتواند 12 کاراکتر باشد"),
  password: z
    .string({ message: "رمز عبور الزامی است" })
    .min(8, "کلمه عبور باید حداقل 8 کاراکتر باشد")
    .max(16, "کلمه عبور حداکثر میتواند 16 کاراکتر باشد"),
});

export type SigninDtoType = z.infer<typeof SigninDto>;

export const SignupDto = z.object({
    name: z
        .string({ message: "نام الزامی است" })
        .max(255, "نام حداکثر میتواند 255 نویسه باشد"),

    email: z
        .email("ایمیل را به درستی وارد کنید"),

    username: z
        .string({ message: "نام کاربری الزامی است" })
        .min(5, "نام کاربری باید حداقل 5 کاراکتر باشد")
        .max(12, "نام کاربری حداکثر میتواند 12 کاراکتر باشد"),

    password: z
        .string({ message: "رمز عبور الزامی است" })
        .min(8, "کلمه عبور باید حداقل 8 کاراکتر باشد")
        .max(16, "کلمه عبور حداکثر میتواند 16 کاراکتر باشد"),

    repeat_password: z
        .string({ message: "رمز عبور الزامی است" })
        .min(8, "کلمه عبور باید حداقل 8 کاراکتر باشد")
        .max(16, "کلمه عبور حداکثر میتواند 16 کاراکتر باشد"),
})
.refine((data) => data.password === data.repeat_password, {
    message: "رمز عبور با تکرار آن مطابقت ندارد",
    path: ["repeat_password"],
});

export type SignupDtoType = z.infer<typeof SignupDto>;