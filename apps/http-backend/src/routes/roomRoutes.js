"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controllers/roomController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.auth);
router.post("/create-room", roomController_1.CreateRoom);
router.post("/join-room", roomController_1.joinRoom);
router.post("/leave-or-delete", roomController_1.leaveRoom);
router.post("/verify", roomController_1.VerifyUserInRoom);
router.get("/rooms", roomController_1.getRooms);
exports.default = router;
