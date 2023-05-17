const productrouter = require("express").Router();
const ProductModel = require("../Models/Products");

/**
 * CREATE A NEW ACCOUNT
 * METHOD = POST
 * PATH = /createAccount
 * INPUT = { userName: string, userEmailId: string, phoneNumber: string, password: string }
 */



productrouter.get("/getAllproducts", async function (req, res, next) {
  try {
    const response = await ProductModel.find();
    if (response.length > 0) {
      res.status(200).json({
        message: "Products Fetched Successfully!!!",
        data: response,
        success: true,
      });
    } else {
      res.status(200).json({
        message: "No products found!!!",
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


productrouter.post("/create", async (request, response, next) => {
  const { productName, productlocation,producttype,phoneNumber } = request.body;
  /**
   * CHECKING WHETHER USER ALREADY HAVE ACCOUNT WITH US
   */

  const userExistingData = await ProductModel.findOne({
    productName:productName,
    producttype:producttype,
  });
  if (userExistingData?._id) {
    return response.status(409).json({
      success: false,
      message: "product already exists",
    });
  } else {
    //CONSTRUCTING NEW SIGNUP OBJECT
    const newUser = new ProductModel({
      
      phoneNumber: phoneNumber,
      productName:productName,
      productlocation:productlocation,
      producttype:producttype,
    
  
    });
    // TRYING TO SAVE USER IN DATABASE
    newUser
      .save()
      .then((res) => {
        if (res._id) {
          response.status(200).json({
            success: true,
            message: "product created successfully!!!",
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

module.exports = productrouter;