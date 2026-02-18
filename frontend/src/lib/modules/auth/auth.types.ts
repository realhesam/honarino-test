export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  profile: string;
  phone: string;
  address: string;
  admin: string;
  banned: string;
  created_at: string;
  updated_at: string;
}

export interface SigninRequest {
  username: string;
  password: string;
}

export interface SigninResponse {
  access_token: string;
  user: User;
}

export interface SignupRequest {
  name: string;
  username: string;
  password: string;
  email: string;
}
   
export interface SignupResponse extends User {
  password: string;
}