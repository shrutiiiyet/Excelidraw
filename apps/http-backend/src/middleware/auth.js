"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const config_1 = require("@repo/backend-common/config");
const env_1 = require("../config/env");
const httpStatus_1 = require("../utils/httpStatus");
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({
                message: "Access Denied: No token provided"
            });
            return;
        }
        const decoded = (0, config_1.verifyToken)(token, env_1.JWT_SECRET);
        if (!decoded) {
            res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "Invalid Token" });
            return;
        }
        req.auth = { id: decoded.id };
        next();
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "Authentication Failed" });
        return;
    }
};
exports.auth = auth;
