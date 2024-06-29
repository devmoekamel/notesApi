import mongoose from "mongoose";

export const connectDB = async () => {

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedtopology:true,
    });
    console.log("connected to DB",conn.connection.host);

};
