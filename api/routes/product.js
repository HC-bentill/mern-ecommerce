const Product = require("../models/Product");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const mongoose = require("mongoose");
const router = require("express").Router();

//CREATE

router.post("/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    if (savedProduct) {
      res.status(200).json({message: "Product Added Successfully", data: savedProduct, success: true});
    } else {
      res.status(400).json({message: "Could not add Product !", data: null, success: false});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body,},{new: true});
    if (updatedProduct) {
      res.status(200).json({message: "Product Updated Successfully", data: updatedProduct, success: true});
    } else {
      res.status(400).json({message: "Product does not exist", data: null, success: false});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json({message: "Product has been deleted successfully", data: null, success: true});
    } else {
      res.status(200).json({message: "Product does not exist", data: null, success: false});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({message: "Product returned successfully", data: product, success: true});
    } else {
      res.status(200).json({message: "Product does not exist", data: null, success: false});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS BY CATEGORY ID
router.get("/categories/:categoryId", async (req, res) => {
  try {
    const products = await Product.find({
      categories: {$in: [mongoose.Types.ObjectId(req.params.categoryId)]},
    });
    if (products.length > 0) {
      res.status(200).json({message: "Products returned successfully", data: products, success: true});
    } else {
      res.status(200).json({message: "Product does not exist", data: null, success: false});
    }
  } catch (err) {
    res.status(500).json({message: err, data: null, success: false});
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(200).json({message: "Products returned successfully", data: products, success: true});
    } else {
      res.status(200).json({message: "Product does not exist", data: null, success: false});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
