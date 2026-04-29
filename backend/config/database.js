import mongoose, { mongo } from "mongoose"; //WE NEED SOMETHING BETWEEN TO TALK DATABASE AND BACKEND
//connecting database
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );
    console.log(
      `\n SUCCESSFULL CONNECTED MONGODB !!! ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED ", error);
    process.exit(1);
  }
};
export default connectDB;
