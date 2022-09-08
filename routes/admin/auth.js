const router = require("express").Router();
const authAdmin = require("../../models/Admin/auth");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



//LOGIN

router.post('/login', async (req, res) => {
  console.log("the login is ", req.body)
    try{
        const user = await authAdmin.findOne(
            {
                email: req.body.email
            }
        );
 
        if(!user){
          return res.status(401).json("Wrong User Name");
        }


       const originalPassword = user.pass;

       const inputPassword = req.body.password;
        
        if(originalPassword != inputPassword ){
          return  res.status(401).json("Wrong Password");
        }
           
      
        const accessToken = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        // console.log("the access token", accessToken)
        // const { password, ...others } = user._doc;  
        // res.status(200).json({...others, accessToken,"userId":user._id});
        res.status(200).json({"Token":accessToken})

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;
