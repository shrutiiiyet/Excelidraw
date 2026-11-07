"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const getToken = (url) => {
    const queryParams = new URLSearchParams(url?.split("?")[1]);
    const token = queryParams.get("token") || "";
    return token;
};
exports.getToken = getToken;
