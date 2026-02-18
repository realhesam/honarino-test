import type { User } from "../auth/auth.types";

export interface AccountResponse extends User {}

export interface AccountUpdate {
    name?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    profile?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
}