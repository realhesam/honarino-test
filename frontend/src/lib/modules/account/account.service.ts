//test
import { ApiError } from "@/lib/core/errors/ApiError";
import { AppError } from "@/lib/core/errors/AppError";
import { mapToAppError } from "@/lib/core/errors/errorMapper";
import { mapZodErrorToAppError } from "@/lib/core/errors/zodError";
import { ZodError } from "zod";
import { AccountAPI } from "./account.api";
import { UpdateAccountDto, type UpdateAccountDtoType } from "./account.dto";

function removeQueryParams(url: string) {
    const u = new URL(url);
    u.search = "";
    return u.toString();
}

export const AccountService = {
    async get_user_data() {
        try {
            const response = await AccountAPI.get_user_data();
            return response.data;
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            if (err instanceof ApiError) throw err;
            if (err instanceof ZodError) throw mapZodErrorToAppError(err);
            throw mapToAppError(err);
        }
    },

    async update_user_data(data: UpdateAccountDtoType) {
        try {
            const parsedData = UpdateAccountDto.parse(data);
            const response = await AccountAPI.update_user_data(parsedData);

            return response.data;
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            if (err instanceof ApiError) throw err;
            if (err instanceof ZodError) throw mapZodErrorToAppError(err);
            throw mapToAppError(err);
        }
    },

    async upload_file(file: File | Blob) {
        try {
            const response = await AccountAPI.get_upload_url();
            const { url, object_name } = response.data;

            await AccountAPI.upload_file_to_url(url, file);
            const publicUrl = removeQueryParams(url);
            return { publicUrl: publicUrl, objectName: object_name };
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            if (err instanceof ApiError) throw err;
            if (err instanceof ZodError) throw mapZodErrorToAppError(err);
            throw mapToAppError(err);
        }
    },
};
