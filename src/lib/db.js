import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect("mongodb://localhost:27017/holiday-list-planner").then(() => {
    console.log("Connected to MongoDB");
  });
};

export default connectDB;