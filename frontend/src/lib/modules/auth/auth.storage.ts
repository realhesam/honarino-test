const ACCESS_TOKEN_KEY = "access_token";

export const AuthStorage = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setToken(token: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.clear();
  },
};
