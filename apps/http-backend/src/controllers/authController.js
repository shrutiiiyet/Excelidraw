"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.signin = exports.signup = void 0;
const httpStatus_1 = require("../utils/httpStatus");
const services_1 = require("@repo/db/services");
const types_1 = require("@repo/common/types");
const jwt_1 = require("../utils/jwt");
const bcypt_1 = require("../utils/bcypt");
const signup = async (req, res) => {
    try {
        // Validate request
        const parsedData = types_1.CreateUserSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                error: parsedData.error.errors,
            });
            return;
        }
        const { email, password, name } = parsedData.data;
        // check if user exist already or not
        const userExists = await (0, services_1.getUserByEmail)(email);
        if (userExists) {
            res
                .status(httpStatus_1.HttpStatus.BAD_REQUEST)
                .json({ success: false, error: "Username already taken" });
            return;
        }
        // hash password
        const hashedPassword = await (0, bcypt_1.hashPassword)(password);
        // create user
        const newUser = await (0, services_1.createUser)(email, hashedPassword, name);
        res.status(httpStatus_1.HttpStatus.CREATED).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
        return;
    }
    catch (error) {
        console.error("Signup Error:", error);
        res
            .status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, error: "Internal server error" });
        return;
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        // Validate input
        const parsedData = types_1.SigninSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                error: parsedData.error.errors,
            });
            return;
        }
        const { email, password } = parsedData.data;
        // Fetch user from database
        const user = await (0, services_1.getUserByEmail)(email);
        if (!user) {
            res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Invalid email or password",
            });
            return;
        }
        const isPasswordValid = await (0, bcypt_1.verifyPassword)(password, user.password);
        if (!isPasswordValid) {
            res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Invalid email or password",
            });
            return;
        }
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user.id);
        // Send response
        res.status(httpStatus_1.HttpStatus.OK).json({
            success: true,
            message: "Signin successful",
            token,
        });
        return;
    }
    catch (error) {
        console.error("Signin error:", error);
        res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: "Internal server error",
        });
        return;
    }
};
exports.signin = signin;
const me = async (req, res) => {
    try {
        if (!req.auth?.id) {
            res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized: No user ID found",
            });
            return;
        }
        const user = await (0, services_1.getUserById)(req.auth.id);
        if (!user) {
            res.status(httpStatus_1.HttpStatus.NOT_FOUND).json({
                success: false,
                error: "User not found",
            });
            return;
        }
        res.status(httpStatus_1.HttpStatus.OK).json({
            success: true,
            message: `Welcome ${user.name}`,
            name: user.name,
        });
        return;
    }
    catch (error) {
        console.error("Me Route Error:", error);
        res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: "Internal server error",
        });
        return;
    }
};
exports.me = me;
