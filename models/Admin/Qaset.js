const mongoose = require("mongoose");

const QAsetSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    Subject: { type: String},
    totalChapters: { type: String },
    StdName:{ type: String },
    chapters: { type: Array },
  
  },
  { timestamps: true }
);



  
module.exports = mongoose.model("AdminQAset", QAsetSchema);
