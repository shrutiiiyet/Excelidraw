"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.logger = {
    info: (message, ...args) => {
        console.log(chalk_1.default.blue("[INFO]"), message, ...args);
    },
    warn: (message, ...args) => {
        console.warn(chalk_1.default.yellow("[WARN]"), message, ...args);
    },
    error: (message, ...args) => {
        console.error(chalk_1.default.red("[ERROR]"), message, ...args);
    },
    debug: (message, ...args) => {
        if (process.env.DEBUG === "true") {
            console.log(chalk_1.default.magenta("[DEBUG]"), message, ...args);
        }
    },
};
