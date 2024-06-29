import express from "express";
import { configDotenv } from "dotenv";
import notes from "./routes/notes.js";
import users from "./routes/user.js";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

const env = configDotenv({
  path: "./config/config.env",
});

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);

app.listen(3000, () => {
  try {
    connectDB();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
