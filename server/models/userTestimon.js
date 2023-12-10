const mongoose = require("mongoose");

const userTestimonSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  msg: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
});

// user msg model
const userTestimon = new mongoose.model("userTestimonials", userTestimonSchema);

module.exports = userTestimon;
