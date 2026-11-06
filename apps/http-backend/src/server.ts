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

if (process.env.NODE_ENV !== "test") {
  app.listen(HTTP_PORT, () => {
    console.log(`HTTP server listening on port ${HTTP_PORT}`);
  });
}

export default app;
