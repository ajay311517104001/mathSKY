const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  console.log("the res is", req.body)
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    subscription:{
      mts:false,
      mtp:false
    }
  });

  const user = await User.findOne(
    {
        email: req.body.email
    }
);
if(!user){
  try {
    console.log("the new user is",newUser)
 
    const savedUser = await newUser.save();
    const accessToken = jwt.sign(
      {
          id: savedUser._id,
          isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );
      
    res.status(200).json({"username": savedUser.username,accessToken, "userId":savedUser._id})
  } catch (err) {
    res.status(500).json(err);
  }
} else{
  res.status(409).json("User Already exists");

}


});

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                email: req.body.email
            }
        );
        console.log("the login is ", user)
        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");
      
        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        console.log("the access token", accessToken)
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken,"userId":user._id});

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;
