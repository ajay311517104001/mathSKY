const Product = require("../../models/Admin/Product");
const User = require("../../models/User");
const Qaset = require("../../models/Admin/Qaset");
var mongoose = require("mongoose");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const error_msg = "couldn't fetch the "



/* ---------------------------------    PRODUCT FILTER METHODS  -------------------------------------- */
router.get("/getCategoryList", async (req, res) => {
  try {
    const QAsets = await Qaset.find({}, { StdName: 1, category: 1 });
      if (QAsets) {
      let tempArr = [];
      QAsets.forEach((element) => {
        if (element.category) {
          tempArr.push({
            category: element.category,
            StdName: element.StdName,
          });
        }
      });
      var result = tempArr.reduce((unique, o) => {
        if (
          !unique.some(
            (obj) => obj.category === o.category && obj.StdName === o.StdName
          )
        ) {
          unique.push(o);
        }
        return unique;
      }, []);

      res.status(200).json(result);
    } else {
      res.status(200).json( { Message : "No data found" , status : 'success' });
    }
  } catch (err) {
    res.status(500).json( { Message : error_msg + "category list" , status : 'failed' });
  }
});

router.get("/getSubject/:_category", async (req, res) => {
  const { _category } = req.params;
  try {
    if (_category) {
      const sub = await Qaset.find(
        { category: _category },
        { Subject: 1, category: 1 }
      );
   
      if (sub) {
        let tempArr = [];
        sub.forEach((element) => {
          if (element.Subject) {
            tempArr.push(element.Subject);
          }
        });

        res.status(200).json(sub);
      } 
    }

  } catch (err) {
    res.status(500).json( { Message : error_msg + "subject list" , status : 'failed' });
  }
});

router.post("/getProducts", async (req, res) => {
  const { category, Subject } = req.body;
  try{
    const Products = await Product.find({
      category: category,
      Subject: Subject,
    });
    if (Products) {
      res.status(200).json(Products);
    }
  }catch(err){
    res.status(500).json( { Message : error_msg + "products list" , status : 'failed' });
  }



});


/* ---------------------------------   TEST SERIES SUBSCRIPTION INFO METHODS  -------------------------------------- */

router.post("/getSubscriptionInfo", async (req, res) => {

  try{ 
     const user = await User.findOne({
    _id: mongoose.Types.ObjectId(req.body.id),
  });
  if (user) {
    let flag = false;

    user.subscription.map((item) => {
      if (item.productId == req.body.productId) {
        flag = true;
        return res
          .status(200)
          .json({ status: true, list: item.subscriptionList });
      }
    });
    if (flag == false) {
      return res.status(200).json({ status: false });
    }
  }else{
    res.status(500).json( { Message : " No user found", status : 'success' });
  }

}catch(err){
    res.status(500).json( { Message : error_msg + "Subscription Info list" , status : 'failed' });
  }
 
});


router.post("/getTestModulestatus", async (req, res) => {

try{ 
  const user = await User.findOne({
    _id: mongoose.Types.ObjectId(req.body.id),
  });
  if (user) {
    let flag = false;

    user.subscription.map((item, index) => {
      if (item.productId == req.body.productId) {
        item.subscriptionList.map((i) => {
          if (i.moduleId == req.body.moduleId) {
            flag = true;
            return res.status(200).json({ value: i.value });
          }
        });
      }
    });
    if (flag == false) {
      return res.status(500).json({ message: error_msg + "Product & it's test module" });
    }
  }else{
    res.status(500).json( { Message : " No user found", status : 'success' });
  }

}catch(err){
  res.status(500).json( { Message : error_msg + "Test module status" , status : 'failed' });
}
 

});

/* ---------------------------------  USER TEST SERIES SUBSCRIPTION LIST METHODS  -------------------------------------- */

router.post("/mcqtestseriesInfo", async (req, res) => {

try{
  const user = await User.findOne({
    _id: mongoose.Types.ObjectId(req.body.id),
  });
  if (user) {
    // console.log('the user is ', user.subscription)
    res.status(200).json(user.subscription);
  }else{
    res.status(500).json( { Message : " No user found", status : 'success' });
  }

}catch(err){
  res.status(500).json( { Message : error_msg + "User Subscription List" , status : 'failed' });
}
 

});




module.exports = router;
