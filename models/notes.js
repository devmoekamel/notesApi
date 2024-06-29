import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  userId: {
    type: "String",
    required: [true, "please provide a user id"],
  },
  title: {
    type: "String",
    required: [true, "please provide a note title"],
    maxlength: [40, "title can not be more than 40 characters"],
  },
  description: {
    type: "String",
    required: [true, "please provide a note description"],
    maxlength: [200, "description can not be more than 200 characters"],
  },
  color: {
    type: "String",
    default: "#00000",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Note", NotesSchema);
