const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  categoryName: {type: String, required: true, unique:true },
  description: {type: String},
  image: {type: String},
  title: {type: String},
},
{ timestamps: true }
);

module.exports =  mongoose.model("Categories", CategoriesSchema);
