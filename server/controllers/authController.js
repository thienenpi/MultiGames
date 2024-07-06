const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Email not found");
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    );
    const pass = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (pass !== req.body.password) {
      return res.status(401).json("Wrong password");
    }

    if (user.status === "logged in") {
      return res.status(403).json("User already logged in");
    }

    const userToken = jwt.sign({ id: user.id }, process.env.JWT_SEC, {
      expiresIn: "7d",
    });

    user.status = "logged in";
    await user.save();

    const { __v, createdAt, updatedAt, ...userData } = user._doc;

    res.status(200).json({ ...userData, token: userToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  try {
    const newUser = new User(req.body);

    // check if user already exists
    const user = await User.findOne({ email: newUser.email });

    if (user) {
      return res.status(403).json("Email already exists");
    }

    const password = newUser.password;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET
    ).toString();

    newUser.password = encryptedPassword;
    await newUser.save();

    const userToken = jwt.sign({ id: newUser.id }, process.env.JWT_SEC, {
      expiresIn: "7d",
    });

    const { __v, createdAt, updatedAt, ...userData } = newUser._doc;

    res.status(200).json({ ...userData, token: userToken });
  } catch (error) {
    console.error("Failed to register: ", error);
    res.status(500).json(error);
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.status = "logged out";
    await user.save();
    res.status(200).json("Logout successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  login,
  register,
  logout,
};
