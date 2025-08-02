import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect("mongodb+srv://dharanisham2023cse:BRMfBNpsza9UPyM1@cluster0.bqnkknr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected to MongoDB");
  });
};

export default connectDB;
