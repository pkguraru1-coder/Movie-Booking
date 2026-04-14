import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not set in .env file!");
    }
    await mongoose.connect(uri);
    console.log("✅ DB Connected:", mongoose.connection.host);
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
    process.exit(1); // server band kar do agar DB connect nahi hua
  }
};
