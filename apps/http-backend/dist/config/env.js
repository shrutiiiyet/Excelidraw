"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEXT_PUBLIC_SITE_URL = exports.JWT_SECRET = exports.JWT_EXPIRES_IN = exports.HTTP_PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.HTTP_PORT = process.env.PORT || 3000;
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
