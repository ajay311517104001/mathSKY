const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/allUsers", async (req, res) => {

  try {
    const users =  await User.find();
    const newArr = users.map((v,index) => ({...v, id: index+1}))
    //  const newArrayOfObj = users.map((item,index)=>{
    //    item.push({"id":index+1})

    //  })
   // console.log("the updated array",newArrayOfObj)
     let resObj= {
         data:users,
         total:users.length
      }
    res.status(200).json(resObj);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});




router.post("/UpdateTestModuleStatus", async(req, res) => {
  console.log(" the params are", req.body)
  const {ProductId,UserId,moduleId} =req.body
  try{
   const result=   await User.findOneAndUpdate(
          { "_id": UserId ,
           "subscription":{
               "$elemMatch":{
                   "productId":ProductId,
                   "subscriptionList.moduleId":moduleId
               }

           }}
           
  
          ,{
              $set: {
                  "subscription.$[outer].subscriptionList.$[inner].value": true,
                 
              }
          },
          {
              "arrayFilters":[
                  { "outer.productId": ProductId },
                  { "inner.moduleId": moduleId }
              ]
          },
         
          
         )
         if(result){
             res.status(200).json({"message":"success"})
         }else{
          res.status(500).json(" MCQ updation failed");
         }
  
      

  }catch(err){
      res.status(500).json(" err in geting the all mcq datae");
  }
 
  

}

);


router.post("/UpdateTestModuleData", async(req, res) => {
  console.log(" the result status are", req.body)
  const {ProductId,UserId,moduleId,scoreSecured,timeOfCompletion} =req.body
  try{
   const result=   await User.findOneAndUpdate(
          { "_id": UserId ,
           "subscription":{
               "$elemMatch":{
                   "productId":ProductId,
                   "subscriptionList.moduleId":moduleId
               }

           }}
           
  
          ,{
              $set: {
                  "subscription.$[outer].subscriptionList.$[inner].score": scoreSecured,
                  "subscription.$[outer].subscriptionList.$[inner].timeOfCompletion": timeOfCompletion,
                 
              }
          },
          {
              "arrayFilters":[
                  { "outer.productId": ProductId },
                  { "inner.moduleId": moduleId }
              ]
          },
         
          
         )
         if(result){
           console.log("the result is ",result)
             res.status(200).json({"message":"success"})
         }else{
          res.status(500).json(" MCQ updation failed");
         }
  
      

  }catch(err){
      res.status(500).json(" err in geting the all mcq datae");
  }
 
  

}

);


module.exports = router;
