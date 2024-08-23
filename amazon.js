const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4040;
const serverAddress = 'http://localhost:4040'; // Use your local IP address 192.168.43.1
mongoose.connect('mongodb://127.0.0.1:27017/advanced', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  });

const advanceSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  //lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationToken: { type: String },
  isVerified: { type: Boolean, default: false }
});

const Advance = mongoose.model('Advance', advanceSchema);

const jwtPrivateKey = process.env.JWTPRIVATEKEY || 'default_private_key';

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'vinodkumarvinumk@gmail.com',
      pass: 'ehwtemqroxwsvmvc',
    },
  });

  const verificationLink = `${serverAddress}/verify/${token}`;

  const options = {
    from: 'vinodkumarvinumk@gmail.com',
    to: email,
    subject: 'THIS IS TESTING EMAIL VERIFICATION FOR VINODKUMAR WEBSITE',
    html: `<h3>HLO USER YOU ARE WELCOME THIS IS VINODKUMAR MK OWNER OF THIS WEBSITE</h3>
            Click the following link to verify your email: ${verificationLink}
            <img src='https://e1.pxfuel.com/desktop-wallpaper/542/832/desktop-wallpaper-congress-cool-congress-backgrounds-national-flag-thumbnail.jpg' width='750px' height='750px'>`,
  };

  try {
    const info = await transporter.sendMail(options);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error(error);
  }
};

app.post('/register', async (req, res) => {
  try {
    const { fullName,  email, password } = req.body;

    const existingUser = await Advance.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    await Advance.create({ fullName,  email, password: hashedPassword, verificationToken });

    sendVerificationEmail(email, verificationToken);

    res.send('Registration successful. Please check your email to verify your account.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Advance.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: 'Account not verified. Please check your email for verification instructions.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, jwtPrivateKey);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const user = await Advance.findOne({ verificationToken: token });

    if (user) {
      user.verificationToken = null;
      user.isVerified = true;
      await user.save();

      // Redirect to the login page without automatic login
      res.redirect(`${serverAddress}/login?verification=success&automaticLogin=false`);
    } else {
      res.status(404).send('Invalid token');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/login', (req, res) => {
  // Your logic for handling GET requests to /login
  const verificationStatus = req.query.verification;

  console.log('Verification Status:', verificationStatus);
  console.log('Automatic Login:', req.query.automaticLogin);

  if (verificationStatus === 'success' && req.query.automaticLogin !== 'true') {
    console.log('Showing success message');
    res.send('Email verification successful. You can now log in.');
  } else {
    console.log('Showing login page');
    res.send('This is the login page');
  }
});



app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));



