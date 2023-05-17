const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  producttype: {
    type: String,
    required: true,
    
  },
  productlocation: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  
  
 
  
});

module.exports = mongoose.model("Products", ProductSchema);