const Product = require("../models/Admin/Product");
const User = require("../models/User");
var mongoose = require('mongoose');
// const Product = require("../../models/Admin/Product");


const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Qaset = require("../models/Admin/Qaset");

const router = require("express").Router();

//CREATE


router.get("/getCategoryList", async(req, res) => {
  // console.log(" the params are", req.body)
  // const {id,chapterNo} =req.body.data
  try{
      const QAsets = await Qaset.find({ } , {"StdName":1,"category":1});
      //res.status(200).json(QAsets);
    // console.log("the qasets are",QAsets)
      if(QAsets){
          let tempArr =[]
          QAsets.forEach(element => {
              if(element.category){
                   tempArr.push({
                    category:element.category,
                    StdName :element.StdName})
                  
           } })
           
           var result = tempArr.reduce((unique, o) => {
            if(!unique.some(obj => obj.category === o.category && obj.StdName === o.StdName)) {
              unique.push(o);
            }
            return unique;
        },[]);
          //  uniq = [...new Set(tempArr)];
        res.status(200).json(result);
      }else{
        res.status(500).json(" err in geting the all mcq datae");
      }
  }catch(err){
      res.status(500).json(" err in geting the all mcq datae");
  }
 
  

}

);
router.get("/getSubject/:_category",async(req,res)=>{
  console.log("the body is ",req.params._category)
  const {_category}=req.params
  try{
    if(_category){
   const sub = await  Qaset.find({category: _category} , {"Subject":1,"category":1});


    if(sub){

      let tempArr =[]
      sub.forEach(element => {
          if(element.Subject){
               tempArr.push(element.Subject)
              
       } })

    res.status(200).json(sub);
      }

    }
  }catch(err){
    console.log("err in admin product delete api")
  }

 })
router.post("/mcqtestseriesInfo", async (req, res) => {
  console.log('the user is ', req.body)

  const user = await User.findOne(
    {
        _id: mongoose.Types.ObjectId(req.body.id)
    }
  
);
if(user){

  console.log('the user is ', user.subscription)
  res.status(200).json(user.subscription);
  }
      

  // const newProduct = new Product(req.body);

  // try {
  //   const savedProduct = await newProduct.save();
  //   res.status(200).json(savedProduct);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

router.post("/getProducts", async (req, res) => {
  console.log('the user is ', req.body)
   const {category,Subject}=req.body
  const Products = await Product.find(
    {
      category:category,
      Subject:Subject
    }
  
);
if(Products){


  res.status(200).json(Products);
  }
      

  // const newProduct = new Product(req.body);

  // try {
  //   const savedProduct = await newProduct.save();
  //   res.status(200).json(savedProduct);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});
//UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json("Product has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET PRODUCT
// router.get("/find/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL PRODUCTS
// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   try {
//     let products;

//     if (qNew) {
//       products = await Product.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       products = await Product.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       products = await Product.find();
//     }

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
