import { AppError } from '@/lib/core/errors/AppError';
import { mapToAppError } from '@/lib/core/errors/errorMapper';
import { mapZodErrorToAppError } from '@/lib/core/errors/zodError';
import { AuthAPI } from './auth.api';
import { SigninDto, SigninDtoType, SignupDto, type SignupDtoType } from './auth.dto';
import { AuthStorage } from './auth.storage';

export const AuthService = {
  async signin(data: SigninDtoType) {
    try {
      const parsedData = SigninDto.parse(data);

      const response = await AuthAPI.signin(parsedData);

      AuthStorage.setToken(response.data.access_token);

      return response.data;
    } catch (err: unknown) {
      if (err instanceof AppError) throw err;
      if (err instanceof Error && 'issues' in err) {
        throw mapZodErrorToAppError(err as any);
      }
      throw mapToAppError(err);
    }
  },

  async signup(data: SignupDtoType) {
    try {
        const parsedData = SignupDto.parse(data);

        const response = await AuthAPI.signup(parsedData);

        return response.data;
    } catch (err: unknown) {
        if (err instanceof AppError) throw err;
        if (err instanceof Error && 'issues' in err) {
            throw mapZodErrorToAppError(err as any);
        }
        throw mapToAppError(err);
    }
  },
  logout() {
    AuthStorage.clear();
  },

  requireAuth() {
    if (!AuthStorage.getToken()) {
      throw new AppError({
        message: 'لطفا وارد حساب کاربری خود شوید.',
        code: 'UNAUTHORIZED',
        status: 401,
      });
    }
  },

  requireGhost() {
    if (AuthStorage.getToken()) {
      throw new AppError({
        message: 'شما قبلا وارد شده اید.',
        code: 'UNAUTHORIZED',
        status: 401,
      });
    }
  },
};
