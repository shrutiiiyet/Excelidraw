"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
/**
 * Generate a JWT token for user authentication.
 * @param id - The user ID to encode in the token.
 * @returns The generated JWT token.
 */
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, env_1.JWT_SECRET, { expiresIn: "1d" });
};
exports.generateToken = generateToken;
/**
 * Decode a JWT token without verifying.
 * @param token - The JWT token to decode.
 * @returns The decoded payload or null if invalid.
 */
const decodeToken = (token) => {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch (error) {
        // console.error("JWT Decoding Error:", error);
        return null;
    }
};
exports.decodeToken = decodeToken;
