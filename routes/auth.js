const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const clientId = new OAuth2Client(
  "291717498611-daceb28n13btmnk0d6q7onv1mqalplpd.apps.googleusercontent.com"
);
//REGISTER
router.post("/register", async (req, res) => {
  console.log("the res is", req.body);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    try {
      console.log("the new user is", newUser);

      const savedUser = await newUser.save();
      const accessToken = jwt.sign(
        {
          id: savedUser._id,
          isAdmin: savedUser.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      res
        .status(200)
        .json({
          username: savedUser.username,
          accessToken,
          userId: savedUser._id,
        });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(409).json("User Already exists");
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log("the login is ", user);
    if (!user) {
      return res.status(401).json("Wrong User Name");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(401).json("Wrong Password");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    console.log("the access token", accessToken);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken, userId: user._id });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/GoogleLogin", async (req, res) => {
  console.log("the res is", req.body);
  const { token } = req.body;

  try {
    if (req.body) {
      clientId
        .verifyIdToken({
          idToken: token,
          audience:
            "291717498611-daceb28n13btmnk0d6q7onv1mqalplpd.apps.googleusercontent.com",
        })
        .then((response) => {
          const { email_verified, name, email, picture } = response.payload;
          if (email_verified) {
            User.findOne({ email: email }).exec(async (err, user) => {
              if (err) {
                return res
                  .status(400)
                  .json({ message: "Something went Wrong" });
              } else {
                if (user) {
                  const accessToken = jwt.sign(
                    {
                      id: user._id,
                    },
                    process.env.JWT_SEC,
                    { expiresIn: "3d" }
                  );
                  console.log("the access token", accessToken);
                  const { password, ...others } = user._doc;
                  return res
                    .status(200)
                    .json({ ...others, accessToken, userId: user._id });
                } else {


                  const newUser = new User({
                    username: name,
                    email: email,
                    profileUrl: picture,
                    password: CryptoJS.AES.encrypt(
                      email,
                      process.env.PASS_SEC
                    ).toString(),
                  });
                  const savedUser = await newUser.save();
                  const accessToken = jwt.sign(
                    {
                      id: savedUser._id,
                    },
                    process.env.JWT_SEC,
                    { expiresIn: "3d" }
                  );
            

                  return res
                    .status(200)
                    .json({
                      username: savedUser.username,
                      accessToken,
                      userId: savedUser._id,
                    });
                }
              }
            });
          }

       
        });
    } else {
      res.status(409).json("something went wrong");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
