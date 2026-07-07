import type { AuthState, User } from "../interface/auth.interface";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  firstname: string;
  lastname: string;
  email: string;
  gender:string,
  age:string,
  phone: string;
  weight: string;
  goal: string;
  password: string;
  role: "user" | "admin";
};

type LoginSuccessPayload = {
  accessToken: string,
  message: string,
  user: User
}
export type AuthActionType =
  | { type: "REGISTRATION_START" }
  | { type: "REGISTRATION_SUCCESS" }
  | { type: "REGISTRATION_FAILED"; payload: any }
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS", payload: LoginSuccessPayload }
  | { type: "LOGIN_FAILED"; payload: any };

  export type AuthContextType = {
    authState: AuthState,
    registration: (data: RegisterData)=> Promise<any>,
    login: (data: LoginData)=> Promise<any>,
    logout: ()=> void
}

export type Role = "admin" | "user"
