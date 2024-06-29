import express from "express";
import {getAllNotes,getNote,UpdateNote,createNote,deleteNote} from "../controllers/notes.js";
import { requireAuth } from "../middlewares/requiteAuth.js";
const router = express.Router();
router.use(requireAuth);
router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getNote).delete(deleteNote).put(UpdateNote);

export default router ;