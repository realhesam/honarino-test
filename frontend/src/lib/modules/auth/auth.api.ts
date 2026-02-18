import { httpClient } from '@/lib/core/httpClient';
import { SigninRequest, SigninResponse, SignupResponse, type SignupRequest } from './auth.types';

export const AuthAPI = {
  signin(data: SigninRequest) {
    return httpClient.post<SigninResponse>(
      '/api/auth/v1/signin',
      data
    );
  },

  signup(data: SignupRequest) {
    return httpClient.post<SignupResponse>(
        '/api/auth/v1/signup',
        data
    );
  },
};
