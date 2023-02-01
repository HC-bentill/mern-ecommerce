const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({message: "User added successfully !", data: {username: req.body.username, email: req.body.email}, success: true});
  } catch (err) {
    res.status(500).json({message: err, data: null, success: false});
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      res.json({message: "User does not exist !", data: null, success: false});
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (OriginalPassword !== req.body.password) {
        res.json({message: "Wrong credentials!", data: null, success: false});
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          {expiresIn: "3d"}
        );

        const {password, ...others} = user._doc;

        res.status(200).json({message: "Login Successful !", data: {...others, accessToken}, success: true});
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
