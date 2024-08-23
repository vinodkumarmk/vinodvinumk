
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000; // Use the port from .env file

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Define the schema
const contactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
  otp: { type: String, required: true }, // store OTP
  otpExpires: { type: Date, required: true }, // store OTP expiration time
  isVerified: { type: Boolean, default: false }, // to track OTP verification
});

const Contact = mongoose.model('Contact', contactSchema);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // use your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Use the email from .env file
    pass: process.env.EMAIL_PASS, // Use the password from .env file
  }
});

// Route to handle OTP generation
app.post('/contact', async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Save contact details along with OTP and expiration time (without message)
    let contact = await Contact.findOneAndUpdate(
      { email },
      { otp, otpExpires, isVerified: false },
      { new: true, upsert: true } // create new if not exists
    );

    // Send OTP to the user's email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending OTP email' });
      }
      console.log('Email sent:', info.response);
      res.status(201).json({ message: 'OTP sent to your email.' });
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'An error occurred while generating OTP' });
  }
});

// Route to verify OTP and store message
app.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp, name, phone, message } = req.body;

    // Find the contact using email
    const contact = await Contact.findOne({ email });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Check if the OTP is valid and not expired
    if (contact.otp === otp && contact.otpExpires > new Date()) {
      // OTP verified, update contact with message and verification status
      contact.name = name;
      contact.phone = phone;
      contact.message = message;
      contact.isVerified = true;
      await contact.save();

      res.status(200).json({ message: 'OTP verified successfully. Your message has been sent.' });
    } else {
      res.status(400).json({ error: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'An error occurred during OTP verification' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
