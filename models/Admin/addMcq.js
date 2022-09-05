const mongoose = require("mongoose");

const addMcqSchema = new mongoose.Schema(
    {
        ques: { type: String, required: true },
        option1: { type: String},
        option2: { type: String },
        option3:{ type: String },
        option4: { type: String },
        ans: { type: String },
    
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("AdminAddMcq", addMcqSchema);
