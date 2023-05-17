const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmailId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
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