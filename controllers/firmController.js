/*const Firm = require('../models/Firm')
const multer = require('multer')
const Vendor = require ('../models/Vendor')



 // Set up multer storage
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // save uploaded files to the uploads directory
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // rename uploaded files
    }
  });
  
  // Initialize multer upload
  const upload = multer({ storage: storage });
const addFirm = async(req,res)=>{
   try {
    const {firmName, area, category, region, offer}= req.body;

    const image = req.file? req.file.filename:undefined;
    const vendor = await Vendor.findById(req.vendorId);
    if(!vendor){
        res.status(404).json({message:"vendor not found"})
    }

    const firm = new Firm({
        firmName, area, category, region, offer, image, vendor:vendor._Id
    })

     const savedFirm = await firm.save();

     vendor.firm.push(savedFirm)

     await vendor.save()

    return res.status(200).json({message:"firm added successfuly"})
   } catch (error) {
    console.error(error)
    res.status(500).json("internal server error")
   }

}

  
const deleteFirmById = async(req,res)=>{
  try {
      const firmId = req.params.firmId;
      const deletedProduct = await Firm.findByIdAndDelete(firmId)
      if(!deletedProduct){
          return res.status (404).json({error: "No Product Found"})
      }

  } catch (error) {
       console.error(error)
      res.status(500).json({error: "Internal server error"})
  }
}



module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById}*/

// controllers/firmController.js/*
/*
const Firm = require("../models/Firm");
const multer = require("multer");
const Vendor = require("../models/Vendor");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save uploaded files to the uploads directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // rename uploaded files
  },
});

// Initialize multer upload
const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : undefined;
    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedFirm = await firm.save();

    vendor.firm.push(savedFirm);

    await vendor.save();

    return res.status(200).json({ message: "Firm added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deletedFirm = await Firm.findByIdAndDelete(firmId);
    if (!deletedFirm) {
      return res.status(404).json({ error: "No firm found" });
    }
    res.status(200).json({ message: "Firm deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addFirm: [upload.single("image"), addFirm], deleteFirmById };*/

const Firm = require('../models/Firm');
const multer = require('multer');
const Vendor = require('../models/Vendor');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : undefined;
    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    
    if(vendor.firm.length > 0){
      return  res.status(400).json({message:"vendor can have only one firm"})
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedFirm = await firm.save();

    const firmId = savedFirm._id

    vendor.firm.push(savedFirm);

    await vendor.save();

  

    return res.status(200).json({ message: "Firm added successfully", firmId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deletedFirm = await Firm.findByIdAndDelete(firmId);
    if (!deletedFirm) {
      return res.status(404).json({ error: "Firm not found" });
    }
    // Handle success
    return res.status(200).json({ message: "Firm deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addFirm: [upload.single('file'), addFirm], deleteFirmById };
