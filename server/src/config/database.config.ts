import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("trying to conenct to uri ", process.env.DATABASE_URI, {
      serverSelectionTimeoutMS: 20000,
    });
    const conn = await mongoose.connect(
      process.env.DATABASE_URI || "mongodb://localhost/spaceX"
    );

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB Disconnected");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    process.exit(1);
  }
};
