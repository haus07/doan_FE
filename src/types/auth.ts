export interface UserProfile{
    id: number,
    name?: string,
    email?: string,
    role?: string[],
    permissions?: string[]
}


export interface AuthProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?:UserProfile|null
}


export interface JwtContextType {
    isLoggedIn: boolean,
    inItiallize: boolean,
    user: UserProfile | null | undefined,
    login(email: string, password: string)=> void();
    
}