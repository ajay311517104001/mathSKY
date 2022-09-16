const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    Subject: { type: String},
    productName: { type: String },
    QAsetId:{ type: String },
    totalTestModules : { type: Number},
    StdName:{ type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminProduct", ProductSchema);
