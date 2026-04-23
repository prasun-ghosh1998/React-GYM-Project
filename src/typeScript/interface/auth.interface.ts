
export interface User {
    name: string;
    email: string;
    role: string;
}
export interface AuthState{
    loading: boolean;
    error: string | null;
    token : string | null;
    role: string | null;
    user: User | null
}