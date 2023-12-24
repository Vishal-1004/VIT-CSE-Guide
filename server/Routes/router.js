const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");

// Routes
router.get("/", controllers.api);
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
router.post("/user/allsubject", controllers.getAllSubject);
router.post("/user/subject",controllers.Subject);
router.delete("/user/deletesubject", controllers.deleteSubject);
router.post("/user/subject/updatesyllabus", controllers.updateSyllabus);
router.post('/user/subject/studymaterial', controllers.studyMaterial);
router.post('/user/subject/paper',controllers.Paper);
router.post('/user/subject/refvdo',controllers.RefVdos);
router.delete('/user/subject/deletestudymat',controllers.deleteStudyMaterial);
router.delete('/user/subject/deletepaper',controllers.deletePaper);
router.delete('/user/subject/deleterefvdo',controllers.deleteRefVideo);
router.post('/user/subject/getmaterial',controllers.getMaterial);

module.exports = router;
