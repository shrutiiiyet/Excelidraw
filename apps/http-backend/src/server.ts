import express, { type Request, type Response } from "express";
import cors from "cors";
import { HTTP_PORT, NEXT_PUBLIC_SITE_URL } from "./config/env";

// import routers
import authRouter from "./routes/authRoutes";
import roomRouter from "./routes/roomRoutes";
import canvasRouter from "./routes/canvasRoutes";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

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

app.listen(HTTP_PORT, () => {
  console.log(`[ server ] is listening on : http://localhost:${HTTP_PORT}`);
});
