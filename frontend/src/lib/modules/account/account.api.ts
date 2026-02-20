import { httpClient } from "@/lib/core/httpClient";
import { type AccountResponse, type AccountUpdate } from "./account.types";

export const AccountAPI = {
    get_user_data() {
        return httpClient.get<AccountResponse>("/api/account/v1/");
    },

    update_user_data(data: AccountUpdate) {
        return httpClient.post<AccountResponse>("/api/account/v1/", data);
    },

    get_upload_url() {
        return httpClient.get<{ url: string; object_name: string }>("/api/account/v1/upload/");
    },

    upload_file_to_url(uploadUrl: string, file: File | Blob) {
        return fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file instanceof File ? file.type : "application/octet-stream",
            },
        }).then(res => {
            if (!res.ok) {
                throw new Error(`Upload failed with status ${res.status}`);
            }
            return true;
        });
    },
};
