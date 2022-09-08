const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
    {
        userId: { type: String},
        pass: { type: String},
       
    
    },

  );

  module.exports = mongoose.model("Adminauth", authSchema);
