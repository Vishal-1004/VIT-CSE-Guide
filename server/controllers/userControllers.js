const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const userMsg = require("../models/userMsg");
const userTestimon = require("../models/userTestimon");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "abcdefghijklmnop";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



// email config
const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// user Registration
exports.userregister = async (req, res) => {
  const { fname, email, password, isAdmin } = req.body;

  if (!fname || !email || !password) {
    res.status(400).json({ error: "Please Enter All Input Data" });
  }

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      res.status(400).json({ error: "This User Allready exist in our db" });
    } else {
      const userregister = new users({
        fname,
        email,
        password,
        isAdmin: isAdmin || false,
      });

      // here password hasing

      const storeData = await userregister.save();
      res.status(200).json(storeData);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

// user send otp
exports.userOtpSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Please Enter Your Email" });
  }

  try {
    const presuer = await users.findOne({ email: email });

    if (presuer) {
      const OTP = Math.floor(100000 + Math.random() * 900000);

      const existEmail = await userotp.findOne({ email: email });

      if (existEmail) {
        const updateData = await userotp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );
        await updateData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For Otp Validation",
          text: `OTP:- ${OTP}`,
        };

        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      } else {
        const saveOtpData = new userotp({
          email,
          otp: OTP,
        });

        await saveOtpData.save();
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Eamil For Otp Validation",
          text: `OTP:- ${OTP}`,
        };

        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      }
    } else {
      res.status(400).json({ error: "This User Not Exist In our Db" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.userLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
    res.status(400).json({ error: "Please Enter Your OTP and email" });
  }

  try {
    const otpverification = await userotp.findOne({ email: email });

    if (otpverification.otp === otp) {
      const preuser = await users.findOne({ email: email });

      // token generate
      const token = await preuser.generateAuthtoken();
      res
        .status(200)
        .json({ message: "User Login Succesfully Done", userToken: token });
    } else {
      res.status(400).json({ error: "Invalid Otp" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

// get user data
exports.userData = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, SECRECT_KEY);
    // token expiration handling
    /*const user = jwt.verify(token, SECRECT_KEY, (err, res) => {
      if (err) {
        return "Token expired";
      } else {
        return res;
      }
    });

    if (user === "Token expired") {
      res.status(401).json({ error: "Token Expired", data: "Token Expired" });
    }
    */
    const userID = user._id;
    const userData = await users.findOne({ _id: userID });

    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(400).json({ error: "Some Error Occured", error });
  }
};

// messsage from user
exports.sendMessage = async (req, res) => {
  const { email, message, fname } = req.body;

  if (!email || !message || !fname) {
    res.status(400).json({ error: "Please Enter All Input Data" });
  }
  try {
    const userMessage = new userMsg({
      email: email,
      msg: message,
      fname: fname,
    });

    const data = await userMessage.save();
    return res.status(200).json({ message: "Email was send", data });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({
        message:
          "Wait for reply for previous message before sending new message",
      });
    } else {
      // Handle other types of errors
      res.status(400).json({ message: error.message });
    }
  }
};

// get all messages
exports.getMessages = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Please Enter All Input Data" });
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser.isAdmin) {
      const allData = await userMsg.find();
      res.status(200).json({ dataArray: allData });
    } else {
      res.status(200).json({ message: "Only Admins can access messages" });
    }
    //res.status(200).json(preuser.isAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const { index } = req.body;

  try {
    // Find the document with the given _id
    const data = await userMsg.findOne({ _id: index });

    if (!data) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Delete the document
    await userMsg.deleteOne({ _id: index });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.uploadTestimonial = async (req, res) => {
  const { fname, email, message } = req.body;

  if (!fname || !email || !message) {
    res.status(400).json({ error: "Please Enter All Input Data" });
  }

  try {
    const givenTestimonial = new userTestimon({ fname, email, msg: message });
    const storeData = await givenTestimonial.save();

    res.status(200).json({ message: "Uploaded Successfully", storeData });
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.getTestimonials = async (req, res) => {
  const { request } = req.body;
  try {
    if (request) {
      const allData = await userTestimon.find();
      res.status(200).json({ dataArray: allData });
    } else {
      res.status(200).json({ message: "Only Admins can access messages" });
    }
    //res.status(200).json(preuser.isAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  const { index } = req.body;

  try {
    // Find the document with the given _id
    const data = await userTestimon.findOne({ _id: index });

    if (!data) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Delete the document
    await userTestimon.deleteOne({ _id: index });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};