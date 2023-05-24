const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmailId: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default:"user",
  },
  password: {
    type: String,
    required: true,
  },
  recentOtp: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("user", SignupSchema);