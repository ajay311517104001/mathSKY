const router = require("express").Router();

const Product = require("../../models/Admin/Product");

// router.post("/addProduct", async (req, res) => {
//      console.log("the body is ",req.body)

//      let  {subject, totalChapters, std,price}=req.body
//       if (req.body) {

//         let chapters_array=[]
//         for(let i =0; i<totalChapters;i++){
//              chapters_array.push({
//                chapterNo: "Chapter "+ Number(i+1),
//                mcqList:[]
//              })
//         }
//        // let chapters_array=new Array(totalChapters).fill([]);
//         const newProduct = new Product({
//           std: std,
//           subject: subject,
//           totalChapters:totalChapters,
//           price:price,
//           chapters:chapters_array
//         });
//         console.log("the new product is ", newProduct)
//         await newProduct.save();
//         res.status(500).json("success");
//       } else {
//         res.status(200).json("failure");
//       }}
    
//   )



// router.get("/getProduct", async(req, res) => {

//   const modules = await Product.find();
//        res.status(200).json(modules);
// }

// );

router.post("/addProduct", async (req, res) => {
     console.log("the body is ",req.body)

     let  {category, productName, Subject,totalModules,standardText,price}=req.body
      if (req.body) {
        const newProduct = new Product({
          category: category,
          productName: productName,
          Subject:Subject,
          price:price,
          StdName:standardText,
          totalTestModules:totalModules
        });
        console.log("the new product is ", newProduct)
        await newProduct.save();
        res.status(200).json("success");
      } else {
        res.status(500).json("failure");
      }}
    
  )

router.get("/getProduct", async(req, res) => {

    const modules = await Product.find();
    if(modules){
      res.status(200).json(modules);
    }else{
      res.status(500).json("failure");
    }
    
  
  }
  
  );

  router.post("/updateProduct", async (req, res) => {
    console.log("the body issss ",req.body)

    let  {category, productName, Subject,totalModules,standardText,price,id}=req.body
     if (req.body) {

      const _Product = await Product.findOne(
        {
            _id: id
        }
    );
    try{
      if(_Product){
       
        _Product.category= category
        _Product.productName=productName
        _Product.Subject=Subject
        _Product.price=price
        _Product.StdName=standardText
        _Product.totalTestModules=totalModules
        
        await _Product.save();
        res.status(200).json({"message":"success"});
      }else{
        res.status(500).json("Product updation error");
      }
    }catch(err){
      console.log("product update err",err)
    }
    
       
      // console.log("the new product is ", user)
    
     } else {
       res.status(500).json("failure");
     }}
   
 )

 router.delete("/deleteProduct/:_id",async(req,res)=>{
  console.log("the body is ",req.params._id)
  const {_id}=req.params
  try{
    if(_id){
     await Product.deleteOne(
        {
            _id: _id
        }
      
       
    );
  
  
    }
  }catch(err){
    console.log("err in admin product delete api")
  }
  res.status(200).json({"message":"success"});

 })





module.exports = router;
