import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config();

console.log("STARTING SERVER...");
console.log("MONGO:", process.env.MONGODB_URI);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`SERVER RUNNING ON ${PORT}`);
    });
  } catch (error) {
    console.log("ERROR:", error);
  }
};

startServer();
