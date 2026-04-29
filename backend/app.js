import express from "express";
import cors from "cors";

app.use(
  cors({
    origin: "https://oe-market.vercel.app",
    credentials: true,
  }),
);
const app = express(); //create an Express app

app.use(express.json());

//route import
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import savedRouter from "./routes/saved.routes.js";

//routes declaration
app.use("/api/v1/saved", savedRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/listings", listingRouter);
app.use("/uploads", express.static("backend/uploads"));
//example route: http://localhost:4000/api/v1/users/register

export default app;
