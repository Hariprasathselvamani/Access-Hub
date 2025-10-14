import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./Config/mongodb.js";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [process.env.FRONTEND_URL].filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("API Working"));

// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

// Serve React client
app.use(express.static(join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
