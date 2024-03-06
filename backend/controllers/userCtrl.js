const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const generateAccessToken = require("../config/jwtToken");
const generateRefreshToken = require("../config/refreshToken");
const { uploadFileToCloudinary } = require("../utils/cloudinary");

//-----------------------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      res.json({ message: "User already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      //Getting the local file path for image to upload to cloudinary
      const profileImgLocalPath = req.file?.path;

      console.log(profileImgLocalPath);
      if (!profileImgLocalPath) {
        res.json({ message: "Image is required" });
        return;
      }

      //UPLOADING IMAGE FILE IN CLOUDINARY
      const profileImage = await uploadFileToCloudinary(profileImgLocalPath);
      if (!profileImage) {
        res.json({ message: "Image file is not uploaded " });
        return;
      }
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        profileImg: profileImage.url,
      });
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).json({ message: "registration failed" });
    console.log(error);
  }
});
//----------------------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isValidPassword = await bcrypt.compare(password, user.password);

    // Generate & store refresh and access Token to the Cookies in the browser headers
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 72 * 60 * 60 * 1000,
      sameSite: "none",
    });

    if (user && isValidPassword) {
      res.json({
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        password: user?.password,
        profileImg: user?.profileImg,
        accessToken: accessToken,
      });
    } else {
      res.status(200).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error Logging User" });
  }
});

//-------------------------------------------------------
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const { firstName, lastName, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error Updating user" });
  }
});
//-----------------------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.json({ message: "User logged out" });
  } catch (error) {
    res.json({ message: "Logout failed" });
  }
});
//----------------------Forgot Password----------

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, {
      expiresIn: "15m",
    });

    const resetLink = `http://localhost:3000/reset-password/${user._id}/${token}`;
    res.json({ message: "Pasword reset link is sent to your email" });

    console.log(resetLink);

    //Sending email to user
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const info = transporter.sendMail({
      from: "roshrkd@gmail.com",
      to: user.email,
      subject: `Hello ${user.firstName}, please check the link sent to your email account`,

      html: `<a href=${resetLink}>Click here<a/>
       to reset your password`,
    });
  } else {
    res.json({ message: "User not found in database" });
  }
};

//-----------Reset Password--------------------
const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Update the user's password in the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "User password saved" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(400).json({ message: "Token has expired" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
