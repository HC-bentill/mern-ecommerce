const Categories = require("../models/Categories");

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

const router = require("express").Router();

//CREATE

// router.post("/add", verifyTokenAndAdmin, async (req, res) => {
router.post("/add", async (req, res) => {
  const newCategory = new Categories(req.body);

  try {
    const savedCategory = await newCategory.save();

    res.status(200).json({message: "Category Added Successfully", data: savedCategory, success: true});
  } catch (err) {
    res.status(500).json({message: err, data: null, success: false});
  }
});

//UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );
    if (updatedCategory) {
      res.status(200).json({message: "Category Updated Successfully", data: updatedCategory, success: true});
    }else{
      res.status(200).json({message: "Category does not exist", data: null, success: false});

    }
  } catch (err) {
    res.status(500).json({message: err, data: null, success: false});
  }
});

//DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
router.delete("/:id", async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);
    if (category) {
      res.status(200).json({message: "Category has been deleted successfully", data: null, success: true});
    } else {
      res.status(200).json({message: "Category does not exist", data: null, success: false});
    }
  } catch (err) {
    res.status(500).json({message: err, data: null, success: false});
  }
});

//GET ONE
router.get("/:id", async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (category) {
      res.status(200).json({message: "Category returned successfully", data: category, success: true});
    } else {
      res.status(200).json({message: "Category does not exist", data: category, success: false});
    }
  } catch (err) {
    res.status(500).json({message: err, data: null, success: false});
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const categories = await Categories.find();
    if (categories?.length > 0) {
      res.status(200).json({message: "Categories returned successfully", data: categories, success: true});
    } else {
      res.status(200).json({message: "No categories added", data: null, success: false});
    }
  } catch (err) {
    res.status(500).json({message: err, data: null, success: false});
  }
});

module.exports = router;
