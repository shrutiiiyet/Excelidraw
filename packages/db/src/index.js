"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_1 = require("@prisma/client");
// declare global {
//   var client: PrismaClient | undefined;
// }
// const client = global.client ?? new PrismaClient();
// if (process.env.NODE_ENV !== "production") {
//   globalThis.client = client;
// }
const client = new client_1.PrismaClient();
exports.client = client;
