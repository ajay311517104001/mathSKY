const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    isPaid: { type: Boolean, required: true },
    amount:{type:Number,required:true},
    totalTestModules:{type:Number,required:true},
    productId:{ type: String, required:true},
    razorpay:{
      orderId:{ type: String, required:true},
      paymentId:{ type: String, required:true},
      signature:{ type: String, required:true}
    }


  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
