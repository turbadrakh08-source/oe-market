import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); // ✅ THIS FIXES YOUR ERROR

app.use(express.json());

// routes
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import savedRouter from "./routes/saved.routes.js";

app.use("/api/v1/saved", savedRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/listings", listingRouter);

app.use("/uploads", express.static("backend/uploads"));

export default app;
