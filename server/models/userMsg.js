const mongoose = require("mongoose");

const userMsgSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // Remove the unique constraint
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
const userMsg = new mongoose.model("userMsgs", userMsgSchema);

module.exports = userMsg;
