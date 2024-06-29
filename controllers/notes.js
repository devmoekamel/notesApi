import notes from "../models/notes.js";
import Note from "../models/notes.js";
export const getAllNotes = async (req, res) => {
  const userId = req.userId ;
  try {
    const notes = await Note.find({userId});
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).json({
        success: false,
        error: "no note found",
      });
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      userId});
    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const UpdateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).json({
        success: false,
        error: "no note found",
      });
    }
     const updatedNote = await Note.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
     });
     res.status(200).json({
        success:true,
        data:updatedNote
     });
  } catch (error) {
     res.status(400).json({
        success:true,
        error:error.message
     });
  }
};

export const deleteNote = async(req, res) => {
    try{
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).json({
        success: false,
        error: "no note found",
      });
    }
    await note.deleteOne();
    res.status(200).json({
      status:true
    })
  } catch (error) {
     res.status(400).json({
        success:true,
        error:error.message
     });
  }
}