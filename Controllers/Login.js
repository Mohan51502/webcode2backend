const loginrouter = require("express").Router();
const SignupModel = require("../Models/Signup");
const { compareStrings, generateJSONToken } = require("../Utils/Authutils");

loginrouter.get("/getAllUser", async function (req, res, next) {
  try {
    const response = await SignupModel.find();
    if (response.length > 0) {
      res.status(200).json({
        message: "Users Fetched Successfully!!!",
        data: response,
        success: true,
      });
    } else {
      res.status(200).json({
        message: "No Users!!!",
        data: [],
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
      success: false,
    });
  }
});



loginrouter.get("/getUser/:id", async function (req, res, next) {
  try {
    const response = await AuthModel.findById(req.params.id);
    if (response && response._id) {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!!!",
        data: response,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "No user found!!!",
      });
    }
  } catch (error) {
    if (
      (error && error.name && error.name === "ValidationError") ||
      error.name === "CastError"
    ) {
      res.status(400).json({
        success: false,
        message: error._message,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error!!!",
        error: error,
      });
    }
  }
});



loginrouter.post("/request", async (request, response, next) => {
  const { userEmailId, password } = request.body;
  const userExistingData = await SignupModel.findOne({
    userEmailId: userEmailId,
  });
  if (userExistingData?._id) {
    const match = await compareStrings(password, userExistingData.password);
    if (match) {
      return response.status(200).json({
        success: true,
        token: await generateJSONToken({
          name: userExistingData?.userName,
          role: "user",
        }),
        message: "Logged in successfully!!!",
      });
    } else {
      return response.status(400).json({
        success: false,
        message: "EmailId or Password is In-correct!!!",
      });
    }
  } else {
    return response.status(400).json({
      success: false,
      message: "User account doesnt exists, create new account!!!",
    });
  }
});


module.exports = loginrouter;