"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomSchema = exports.SigninSchema = exports.CreateUserSchema = exports.nameSchema = exports.passwordSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
// Email Schema
exports.emailSchema = zod_1.z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .nonempty({ message: "Email is required" });
// Password Schema
exports.passwordSchema = zod_1.z
    .string()
    .trim()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password cannot exceed 64 characters" })
    .regex(/[A-Z]/, {
    message: "Password must include at least one uppercase letter",
})
    .regex(/[a-z]/, {
    message: "Password must include at least one lowercase letter",
})
    .regex(/\d/, { message: "Password must include at least one number" })
    .regex(/[^A-Za-z0-9]/, {
    message: "Password must include at least one special character",
});
// Name Schema
exports.nameSchema = zod_1.z
    .string()
    .trim()
    .nonempty({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" });
// Create User Schema (Signup)
exports.CreateUserSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: exports.passwordSchema,
    name: exports.nameSchema,
});
// Signin Schema
exports.SigninSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: zod_1.z
        .string()
        .trim()
        .nonempty({ message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" }),
});
// Create Room Schema
exports.CreateRoomSchema = zod_1.z.object({
    roomName: zod_1.z
        .string()
        .trim()
        .nonempty({ message: "Room name is required" })
        .min(3, { message: "Room name must be at least 3 characters long" }),
});
