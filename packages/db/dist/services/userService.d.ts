export declare const createUser: (email: string, hashedPassword: string, name: string) => Promise<{
    id: string;
    email: string;
    password: string;
    name: string | null;
    photo: string | null;
    createdAt: Date;
}>;
export declare const getUserByEmail: (email: string) => Promise<{
    id: string;
    email: string;
    password: string;
    name: string | null;
    photo: string | null;
    createdAt: Date;
} | null>;
export declare const getUserById: (id: string) => Promise<{
    id: string;
    email: string;
    password: string;
    name: string | null;
    photo: string | null;
    createdAt: Date;
} | null>;
//# sourceMappingURL=userService.d.ts.map