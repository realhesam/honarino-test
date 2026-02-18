import { z } from "zod";

export const UpdateAccountDto = z.object({
    name: z
        .string()
        .min(1, "نام الزامی است")
        .max(255, "نام حداکثر میتواند 255 نویسه باشد")
        .optional()
        .refine(val => !val || val.length > 0, { message: "نام الزامی است" }),

    email: z
        .string()
        .email("ایمیل را به درستی وارد کنید")
        .optional()
        .refine(val => !val || val.length > 0, { message: "ایمیل را به درستی وارد کنید" }),

    username: z
        .string()
        .min(5, "نام کاربری باید حداقل 5 کاراکتر باشد")
        .max(12, "نام کاربری حداکثر میتواند 12 کاراکتر باشد")
        .optional()
        .refine(val => !val || val.length > 0, { message: "نام کاربری الزامی است" }),

    password: z
        .string()
        .min(8, "کلمه عبور باید حداقل 8 کاراکتر باشد")
        .max(16, "کلمه عبور حداکثر میتواند 16 کاراکتر باشد")
        .optional()
        .refine(val => !val || val.length > 0, { message: "رمز عبور الزامی است" }),

    profile: z
        .string()
        .min(1, "مشکلی پیش آمد")
        .max(255, "مشکلی پیش آمد")
        .optional()
        .refine(val => !val || val.length > 0, { message: "پروفایل کاربری شما درست نیست" }),

    phone: z
        .string()
        .length(11, "تلفن همراه حتما باید 11 کرکتر باشد")
        .optional()
        .refine(val => !val || val.length > 0, { message: "تلفن همراه الزامی هست" }),

    address: z
        .string()
        .min(3, "ادرس حداقل باید 3 کرکتر باشد")
        .max(255, "ادرس حداکثر میتواند 255 کرکتر باشد")
        .optional()
        .refine(val => !val || val.length > 0, { message: "ادرس الزامی است" }),
});

export type UpdateAccountDtoType = z.infer<typeof UpdateAccountDto>;
