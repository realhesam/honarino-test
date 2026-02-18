"use client";

import { AppError } from "@/lib/core/errors/AppError";
import { AuthService } from "@/lib/modules/auth/auth.service";
import LinkButton from "@/ui/LinkButton";
import { useNotification } from "@/utils/useNotification";
import { redirect } from "next/navigation";
import { useState } from "react";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const notification = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthService.signin({
        username,
        password,
      });

      notification.success("با موفقیت وارد شدید");

      setTimeout(() => {
        redirect("/account");
      }, 100);
    } catch (error) {
      if (error instanceof AppError) {
        notification.error(error.message);
      } else {
        notification.error("خطای غیرمنتظره‌ای رخ داد");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
      >
        <input
          type="text"
          placeholder="نام کاربری"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="رمزعبور"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full flex items-center">
          <LinkButton
            customClass="!w-full h-10 flex items-center justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? "در حال ورود..." : "ورود به حساب"}
          </LinkButton>
        </div>
      </form>
    </div>
  );
}

export default Page;
