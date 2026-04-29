import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    const PORT = process.env.PORT || 8000;
    app.listen(process.env.PORT || 8000, () => {
      console.log(`SERVER IS RUNNING ON PORT : ${PORT}`);
    });
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED", error);
  }
};

startServer();
