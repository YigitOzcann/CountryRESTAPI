import mongoose from "mongoose";
import config from "../src/config";

const connectionString = config.MONGO_URI as string;

const connectDb: any = () => {
  mongoose.set("debug", true);

  mongoose
    .connect(connectionString)
    .then(() => console.log("Connected to countryDb"))
    .catch((err) => console.error("Could not connect to MongoDB...", err));
};

export default connectDb;
