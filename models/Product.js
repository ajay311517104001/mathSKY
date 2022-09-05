const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    std: { type: String, required: true},
    totalChapters: { type: String, required: true, },

    chapters: { type: Array },
    subject: { type: String },

    price: { type: Number, required: true },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
