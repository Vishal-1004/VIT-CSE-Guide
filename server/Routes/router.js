const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");

// Routes
router.post("/user/register", controllers.userregister);
router.post("/user/sendotp", controllers.userOtpSend);
router.post("/user/login", controllers.userLogin);
router.post("/user/data", controllers.userData);
router.delete("/user/delete", controllers.deleteOneUser);
router.post("/user/alluserdata", controllers.getPaginateUsers);
router.post("/user/sendmsg", controllers.sendMessage);
router.post("/user/allmsg", controllers.getMessages);
router.delete("/user/deletemsg", controllers.deleteMessage);
router.delete("/user/deletetestimonial", controllers.deleteTestimonial);
router.post("/user/uploadtestimonial", controllers.uploadTestimonial);
router.post("/user/alltestimonial", controllers.getTestimonials);
router.post("/user/subject",controllers.Subject);
router.post('/user/subject/studymaterial', controllers.studyMaterial);

module.exports = router;
