export declare const createRoom: (name: string, userId: string) => Promise<{
    id: string;
    createdAt: Date;
    slug: string;
    adminId: string;
}>;
export declare const getRoomByName: (roomName: string) => Promise<{
    id: string;
    createdAt: Date;
    slug: string;
    adminId: string;
} | null>;
export declare const getRoomsByUserId: (userId: string) => Promise<{
    id: string;
    name: string | null;
    rooms: {
        id: string;
        createdAt: Date;
        slug: string;
        users: {
            id: string;
            name: string | null;
        }[];
    }[];
} | null>;
export declare const deleteRoom: (roomId: string) => Promise<{
    id: string;
    createdAt: Date;
    slug: string;
    adminId: string;
}>;
export declare const removeUserFromRoom: (roomId: string, userId: string) => Promise<{
    id: string;
    createdAt: Date;
    slug: string;
    adminId: string;
}>;
export declare const getRoomWithUsersById: (roomId: string) => Promise<({
    admin: {
        id: string;
        email: string;
        password: string;
        name: string | null;
        photo: string | null;
        createdAt: Date;
    };
    users: {
        id: string;
        email: string;
        password: string;
        name: string | null;
        photo: string | null;
        createdAt: Date;
    }[];
} & {
    id: string;
    createdAt: Date;
    slug: string;
    adminId: string;
}) | null>;
export declare const getRoomWithUsers: (roomId: string) => Promise<({
    users: {
        id: string;
        email: string;
        password: string;
        name: string | null;
        photo: string | null;
        createdAt: Date;
    }[];
} & {
    id: string;
    createdAt: Date;
    slug: string;
    adminId: string;
}) | null>;
export declare const connectUserWithRoom: (roomId: string, userId: string) => Promise<void>;
export declare const getRoomIfExists: (roomId: string) => Promise<{
    id: string;
    createdAt: Date;
    slug: string;
    adminId: string;
} | null>;
export declare const getRoomByRoomId: (roomId: string) => Promise<({
    users: {
        id: string;
        email: string;
        password: string;
        name: string | null;
        photo: string | null;
        createdAt: Date;
    }[];
} & {
    id: string;
    createdAt: Date;
    slug: string;
    adminId: string;
}) | null>;
//# sourceMappingURL=roomService.d.ts.map