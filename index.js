const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const authAdmin = require("./routes/admin/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const adminProduct = require("./routes/admin/Product");
const adminQaset = require("./routes/admin/Qaset");
const mcqList =require("./routes/McqList")
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/mcqList", mcqList);


app.use("/api/admin", authAdmin);
app.use("/api/admin", adminProduct);
app.use("/api/admin", adminQaset);

// app.use("api/test",async (req,res)=>{
//   res.status(200).json({data:[
//     {
//       "id": 1,
//       "name": "Leanne Graham",
//       "username": "Bret",
//       "email": "Sincere@april.biz",
//       "address": {
//         "street": "Kulas Light",
//         "suite": "Apt. 556",
//         "city": "Gwenborough",
//         "zipcode": "92998-3874",
//         "geo": {
//           "lat": "-37.3159",
//           "lng": "81.1496"
//         }
//       },
//       "phone": "1-770-736-8031 x56442",
//       "website": "hildegard.org",
//       "company": {
//         "name": "Romaguera-Crona",
//         "catchPhrase": "Multi-layered client-server neural-net",
//         "bs": "harness real-time e-markets"
//       }
//     }]
//     , total:500,});
// })

app.listen(process.env.PORT || 8001, () => {
  console.log("Backend server is running!");
});
