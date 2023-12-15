const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const userMsg = require("../models/userMsg");
const userTestimon = require("../models/userTestimon");
const subject = require("../models/subject");
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

// get all users
exports.getPaginateUsers = async (req, res) => {
  const search = req.body.search || "";
  if (search.length === 0) {
    const allUsers = await users.find({});

    const { page, limit } = req.body;

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const result = {};

    result.totalUser = allUsers.length;
    result.pageCount = Math.ceil(allUsers.length / limit);

    if (lastIndex < allUsers.length) {
      result.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      result.prev = {
        page: page - 1,
      };
    }

    result.result = allUsers.slice(startIndex, lastIndex);
    res.status(200).json(result);
  } else {
    const query = {
      fname: { $regex: search, $options: "i" },
    };
    try {
      const userData = await users.find(query);
      res.status(201).json(userData);
    } catch (error) {
      res.status(400).json({ error: "Some Error Occured", error });
    }
  }
};

// get one user data
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

// delete one user
exports.deleteOneUser = async (req, res) => {
  const { index } = req.body;

  try {
    const userData = await users.findByIdAndDelete(index);

    if (!userData) {
      // Handle case where user with the specified ID doesn't exist
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User's Account Deleted Successfully",
      deletedUser: userData,
    });
  } catch (error) {
    // Handle other errors
    res
      .status(500)
      .json({ error: "Some error occurred", details: error.message });
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

// delete message
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

// upload testimonial
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

// get all testimonial
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

// delete a testimonial
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

// add a new subject
exports.Subject = async (req, res) => {
  try {
    const { domain, content } = req.body;

    // Find or create a subject based on domain and courseTitle
    let Subject = await subject.findOne({
      domain,
    });

    if (!Subject) {
      // If subject doesn't exist, create a new one
      Subject = new subject({
        domain,
        content: [content],
      });
    } else {
      // If subject exists, update the content array with the new data
      Subject.content.push(content);
    }

    await Subject.save();

    res.status(201).json(Subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.studyMaterial = async(req,res) => {
    try{
      const {domain, content} = req.body;
      // console.log('Domain:', domain);
      // console.log('Course Title:', content.courseTitle);
      // console.log(req.body);
      const Subjectname = await subject.findOne({domain,'content.courseTitle':content.courseTitle});
      // console.log('Found Subject:', Subjectname);
      if(!Subjectname) {
        return res.status(404).json({message:'Course Not found'});
      }

      const contentItemToUpdate = Subjectname.content.find(item => item.courseTitle === content.courseTitle);
      if (!contentItemToUpdate) {
        return res.status(404).json({ message: 'Content Item Not found for the specified courseTitle' });
      }

      contentItemToUpdate.studyMaterials.push(content.studyMaterials);
      await Subjectname.save();

      res.status(200).json({ message: "Study material added successfully", Subjectname });
    }catch(error){
      res.status(400).json({error:error.message});
    }
};

exports.Paper = async(req,res) => {
    try{
      const {domain, content} = req.body;
      const Subjectname = await subject.findOne({domain,'content.courseTitle':content.courseTitle});
      if(!Subjectname) {
        return res.status(404).json({message:'Course Not found'});
      }

      const contentItemToUpdate = Subjectname.content.find(item => item.courseTitle === content.courseTitle);
      if (!contentItemToUpdate) {
        return res.status(404).json({ message: 'Content Item Not found for the specified courseTitle' });
      }

      contentItemToUpdate.papers.push(content.papers);
      await Subjectname.save();

      res.status(200).json({ message: "Study material added successfully", Subjectname });
    }catch(error){
      res.status(400).json({error:error.message});
    }
};

exports.RefVdos = async(req,res) => {
    try{
      const {domain, content} = req.body;
      const Subjectname = await subject.findOne({domain,'content.courseTitle':content.courseTitle});
      if(!Subjectname) {
        return res.status(404).json({message:'Course Not found'});
      }

      const contentItemToUpdate = Subjectname.content.find(item => item.courseTitle === content.courseTitle);
      if (!contentItemToUpdate) {
        return res.status(404).json({ message: 'Content Item Not found for the specified courseTitle' });
      }

      contentItemToUpdate.referenceVideos.push(content.referenceVideos);
      await Subjectname.save();

      res.status(200).json({ message: "Study material added successfully", Subjectname });
    }catch(error){
      res.status(400).json({error:error.message});
    }
};

exports.deleteStudyMaterial = async (req, res) => {
  const { domain, moduleNo } = req.body;
  try {
    const data = await subject.findOne({ domain });
    if (!data) {
      return res.status(404).json({ error: "Document not found" });
    }
    const studyMaterialIndex = data.content[0].studyMaterials.findIndex(m => m.moduleNo === moduleNo);
    if (studyMaterialIndex === -1) {
      return res.status(404).json({ error: "Study material not found" });
    }
    data.content[0].studyMaterials.splice(studyMaterialIndex, 1);
    await data.save();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deletePaper = async (req, res) => {
  const { domain, examType, year } = req.body;
  try {
    const data = await subject.findOne({ domain });
    if (!data) {
      return res.status(404).json({ error: "Document not found" });
    }
    const paperIndex = data.content[0].papers.findIndex(p => p.examType === examType && p.year === year);
    if (paperIndex === -1) {
      return res.status(404).json({ error: "Paper not found" });
    }
    data.content[0].papers.splice(paperIndex, 1);
    await data.save();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteRefVideo = async (req, res) => {
  const {domain, moduleNo, topic } = req.body;
  try {
    const data = await subject.findOne({domain});
    if (!data) {
      return res.status(404).json({ error: "Document not found" });
    }
    const module = data.content[0].referenceVideos.find(m => m.moduleNo === moduleNo);
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    const videoIndex = module.videos.findIndex(v => v.topic === topic);
    if (videoIndex === -1) {
      return res.status(404).json({ error: "Video not found" });
    }
    module.videos.splice(videoIndex, 1);
    await data.save();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};