const signuprouter = require("express").Router();
const { hashString } = require("../Utils/Authutils");
const SignupModel = require("../Models/Signup");


/**
 * CREATE A NEW ACCOUNT
 * METHOD = POST
 * PATH = /createAccount
 * INPUT = { userName: string, userEmailId: string, phoneNumber: string, password: string }
 */
signuprouter.post("/create", async (request, response, next) => {
  const { userName, userEmailId, phoneNumber, password,role } = request.body;
  const hashedPassword = await hashString(password, 5);
  /**
   * CHECKING WHETHER USER ALREADY HAVE ACCOUNT WITH US
   */

  const userExistingData = await SignupModel.findOne({
    userEmailId: userEmailId,
    phoneNumber: phoneNumber,
  });
  if (userExistingData?._id) {
    return response.status(409).json({
      success: false,
      message: "User account already exists",
    });
  } else {
    //CONSTRUCTING NEW SIGNUP OBJECT
    const newUser = new SignupModel({
      userName: userName,
      userEmailId: userEmailId,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      role: role,
    });
    // TRYING TO SAVE USER IN DATABASE
    newUser
      .save()
      .then((res) => {
        if (res._id) {
          response.status(200).json({
            success: true,
            message: "Account created successfully!!!",
            data: res,
          });
        } else {
          response.status(500).json({
            success: false,
            message: "Something went wrong internally!!!",
            data: res,
          });
        }
      })
      .catch((error) => {
        return response.status(400).json({
          success: false,
          message: "Bad Request!!!",
          error: error,
        });
      });
  }
});

module.exports = signuprouter;