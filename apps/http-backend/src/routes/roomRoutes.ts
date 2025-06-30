
import express, { Router } from "express";

import {
  CreateRoom,
  joinRoom,
  leaveRoom,
  getRooms,
  VerifyUserInRoom,
} from "../controllers/roomController";

import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.use(auth);

router.post("/create-room", CreateRoom);
router.post("/join-room", joinRoom);
router.post("/leave-or-delete", leaveRoom);
router.post("/verify", VerifyUserInRoom);

router.get("/rooms", getRooms);

export default router;
