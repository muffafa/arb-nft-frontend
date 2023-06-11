import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongodb already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "");

    isConnected = true;

    console.log("Connected to mongodb.");
  } catch (error) {
    console.log("Error connecting to mongodb.");
    console.log(error);
  }
};
