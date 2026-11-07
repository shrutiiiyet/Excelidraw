"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmail = exports.createUser = void 0;
const index_1 = require("../index");
const createUser = async (email, hashedPassword, name) => {
    return index_1.client.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
};
exports.createUser = createUser;
const getUserByEmail = async (email) => {
    return await index_1.client.user.findUnique({
        where: {
            email,
        },
    });
};
exports.getUserByEmail = getUserByEmail;
const getUserById = async (id) => {
    return await index_1.client.user.findUnique({
        where: {
            id,
        },
    });
};
exports.getUserById = getUserById;
