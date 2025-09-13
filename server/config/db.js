import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/Momenta`).then(() => {
      console.log("connected to mongodb database.");
    });
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
