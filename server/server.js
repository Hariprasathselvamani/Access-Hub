import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./Config/mongodb.js";
import userRouter from "./routes/userRoutes.js";

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://access-hub-frontend.onrender.com",
].filter(Boolean);
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like curl/postman
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.get("/", (req, res) => res.send("API Working"));



// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "API route not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
