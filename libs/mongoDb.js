import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ashir:Mywtsq1dnXovTERp@cluster0.nzgfapz.mongodb.net/?retryWrites=true&w=majority", {
      dbName: "crud",
      useNewUrlParser: true,
      // useNewUnifiedTopology: true
    });
    console.log("DB CONNECTED! YAHOOOO");
  } catch (error) {
    console.log(error);
  }
};
export default connectMongoDB;
