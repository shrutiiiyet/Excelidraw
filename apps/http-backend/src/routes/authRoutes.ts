import express, { Router } from "express";
import { signup, signin, me } from "../controllers/authController";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", auth, me);

export default router;