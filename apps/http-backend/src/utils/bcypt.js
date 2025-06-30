"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Hash a password using bcrypt with a salt round of 10.
 * @param password - The plain text password to hash.
 * @returns The hashed password as a string.
 */
const hashPassword = (password) => {
    return bcrypt_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
/**
 * Verify if a given password matches a hashed password.
 * @param password - The plain text password to check.
 * @param hashedPassword - The stored hashed password.
 * @returns A boolean indicating whether the passwords match.
 */
const verifyPassword = (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.verifyPassword = verifyPassword;
