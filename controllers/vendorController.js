const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotEnv = require('dotenv')

dotEnv.config();
const secretkey = process.env.WhatIsYourName

const vendorRegister = async(req,res)=>{
     const {username, email, password}= req.body;
     try {
        const vendorEmail = await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(400).json("email alredy taken")
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save()

        res.status(201).json({message :"Vendor registred successfully"})
        console.log("registred")
     } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server errror"})

     }
}



const vendorLogin = async (req,res)=>{
    const {email, password}= req.body
    try {
        const vendor = await Vendor.findOne({email})
        if(!vendor || ! (await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({error:"Invlid username or password"})
        }

        const token = jwt.sign({vendorId: vendor._id},secretkey, {expiresIn:"24h"})

        const vendorId = vendor._id

        res.status(200).json({success:"Login Successfully",token, vendorId})
        console.log(email, "this is token", token)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}

const getAllVendors = async (req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}

const getVendorById = async(req,res)=>{
    const vendorId = req.params.apple ;

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error :"Vendor Not Found"})
        }

        const vendorFirmId = vendor.firm[0]._id;
        res.status(200).json({ vendorId, vendorFirmId})
        console.log( vendorFirmId)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}
module.exports = {vendorRegister , vendorLogin, getAllVendors, getVendorById}