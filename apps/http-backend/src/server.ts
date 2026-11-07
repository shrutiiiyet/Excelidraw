import express, { type Request, type Response, type Express } from "express";

// import routers
import authRouter from "./routes/authRoutes";
import roomRouter from "./routes/roomRoutes";
import canvasRouter from "./routes/canvasRoutes";
import { HTTP_PORT } from "./config/env";

const app: Express  = express();
app.use(express.json());

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Excelidraw!",
  });
});

app.use("/auth", authRouter);
app.use("/room", roomRouter);
app.use("/canvas", canvasRouter);

app.listen(HTTP_PORT, "0.0.0.0", () => {
  console.log(`[HTTP] Server running on port ${HTTP_PORT}`);
});

export default app;
