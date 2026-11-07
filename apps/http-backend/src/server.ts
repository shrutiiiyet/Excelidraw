import express, { type Request, type Response, type Express } from "express";
import cors from "cors";

// import routers
import authRouter from "./routes/authRoutes";
import roomRouter from "./routes/roomRoutes";
import canvasRouter from "./routes/canvasRoutes";
import { HTTP_PORT } from "./config/env";

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000", "https://drawwithexcelidraw.vercel.app"];

const app: Express  = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

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
