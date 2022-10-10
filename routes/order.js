const Order = require("../models/Order");
const User = require("../models/User");
var mongoose = require('mongoose');

const Razorpay = require("razorpay");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const crypto = require("crypto");
const console = require("console");

//CREATE

router.post("/createOrder",  async (req, res) => {
  // const newOrder = new Order(req.body);
 

  // try {
  //   const savedOrder = await newOrder.save();
  //   res.status(200).json(savedOrder);
  // } catch (err) {
  //   res.status(500).json(err);
  // }


  try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}

  // console.log(newOrder)
  // res.sendStatus(200)
});


router.post("/verify", async (req, res) => {
	try {
    console.log("the verify is", req.body)
	    const {totalTestModules,productId}=req.body
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature  } =req.body.response;
			console.log("the response is ",totalTestModules,productId)
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
      const newOrder = Order({
        userId:req.body.id,
        isPaid: true,
		//add product id
		//add test modules count
		totalTestModules:totalTestModules,
		productId:productId,
        amount: req.body.amount,
        razorpay: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
        },
      });

      await newOrder.save();
	  console.log("the user after sub", newOrder)
      const user = await User.findOne(
        {
            _id: mongoose.Types.ObjectId(req.body.id)
        }
      
    );
    if(user){
	//update the default test list according to the test modules count
	//return the user object (list of product id, list of test)


	// [{
	// 	productID:'productID',
	// 	TestModulesList:[
	// 	{	M1:false,
	// 		M2:false,....
		
	// 	}
	// 	]
	// }]
	let subscriptionList =[]
	for(let i=1;i<totalTestModules+1;i++){
		subscriptionList.push({
			moduleId:'M'+i,
			value:false,
			score:-1,
			timeOfCompletion:-1
		})
		}
		// if the subcription list length > 0 just push the data into array 
		//else create a new array and push just like below code
		if(user.subscription.length>0){
			user.subscription.push({productId:productId,subscriptionList:subscriptionList})
			user.save()
		}else{
			user.subscription={productId:productId,subscriptionList:subscriptionList}
			user.save()
		}
 
     console.log("the user after sub", user)
      }
			return res.status(200).json({ message: "Payment verified successfully" });

		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post("/unlock", async (req, res) => {
	try {
    console.log("the verify is", req.body)
	    const {totalTestModules,productId}=req.body
	
   


      const user = await User.findOne(
        {
            _id: mongoose.Types.ObjectId(req.body.id)
        }
      
    );
    if(user){
	//update the default test list according to the test modules count
	//return the user object (list of product id, list of test)


	// [{
	// 	productID:'productID',
	// 	TestModulesList:[
	// 	{	M1:false,
	// 		M2:false,....
		
	// 	}
	// 	]
	// }]
	let subscriptionList =[]
	for(let i=1;i<totalTestModules+1;i++){
		subscriptionList.push({
			moduleId:'M'+i,
			value:false,
			score:-1,
			timeOfCompletion:-1
		})
		}
		// if the subcription list length > 0 just push the data into array 
		//else create a new array and push just like below code
		if(user.subscription.length>0){
			user.subscription.push({productId:productId,subscriptionList:subscriptionList})
			user.save()
		}else{
			user.subscription={productId:productId,subscriptionList:subscriptionList}
			user.save()
		}
 
     console.log("the user after sub", user)
      }
			return res.status(200).json({ message: "unlocked successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});
// //UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json("Order has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET USER ORDERS
// router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // //GET ALL

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET MONTHLY INCOME

// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
