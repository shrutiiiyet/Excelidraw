import express, { Router } from "express";
import { auth } from "../middleware/auth";

import { getCanvasDesigns } from "../controllers/canvasController";

const router: Router = express.Router();

router.use(auth);

router.get("/get-canvas-design/:roomId", getCanvasDesigns);

export default router;