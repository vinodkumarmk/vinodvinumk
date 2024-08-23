/*const express = require('express');
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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationToken: { type: String } // Uncomment if you want to use verification tokens
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

  const options = {
    from: 'vinodkumarvinumk@gmail.com',
    to: email,
    subject: 'THIS IS TESTING EMAIL VERIFICATION FOR VINODKUMAR WEBSITE',
    html: `<h3>HLO USER YOU ARE WELCOME THIS IS VINODKUMAR MK OWNER OF THIS WEBSITE</h3>
           Click the following link to verify your email: http://localhost:5000/verify/${token} 
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
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Advance.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    await Advance.create({ firstName, lastName, email, password: hashedPassword, verificationToken });

    sendVerificationEmail(email, verificationToken);

    res.send('Registration successful. Please check your email to verify your account.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));

*/






/*
 // its workin authntication only

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const joi = require("joi");

// Create Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Port configuration
const port = process.env.PORT || 4040;

// MongoDB connection setup
mongoose.connect('mongodb://127.0.0.1:27017/advanced', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Define the schema
const advanceSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create model
const Advance = mongoose.model('Advance', advanceSchema);

// Set JWT private key from environment variable
const jwtPrivateKey = process.env.JWTPRIVATEKEY || 'default_private_key';





// POST endpoint for user creation

app.post('/vikki', async (req, res) => {
  const validate = (data) => {
    const schema = joi.object({
      firstName: joi.string().required().label("First name"),
      lastName: joi.string().required().label("Last name"),
      email: joi.string().email().required().label("Email"),
      password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
  };

  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const existingUser = await Advance.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(409).send({ message: "User with given email already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new Advance({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    }).save();

    res.status(201).send({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Login endpoint
app.post("/vijay", async (req, res) => {
  const validateLogin = (data) => {
    const schema = joi.object({
      email: joi.string().email().required().label("Email"),
      password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
  };

  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await Advance.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).send({ message: "Invalid email or password" });

    const token = jwt.sign({ _id: user._id }, jwtPrivateKey, { expiresIn: '2h' });
    res.status(200).send({ token: token, message: "Logged in successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));




*/




 /*
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const nodemailer = require('nodemailer');
 const crypto = require("crypto");
 const joi = require('joi');
 require('dotenv').config();
 
 const app = express();
 
 app.use(express.json());
 app.use(cors());
 
 const port = process.env.PORT || 4040;
 
 mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/advanced', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
   .then(() => {
     console.log('Connected to MongoDB');
   })
   .catch((error) => {
     console.error('Error connecting to MongoDB', error);
   });
 
 const advanceSchema = new mongoose.Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
   verified: { type: Boolean, default: false },
 });
 
 const Advance = mongoose.model('Advance', advanceSchema);
 
 const tokenSchema = new mongoose.Schema({
   userid: { type: mongoose.Types.ObjectId, required: true, ref: "Advance" },
   token: { type: String, required: true, unique: true },
   createdAt: { type: Date, default: Date.now, expires: 3600 }, // 1 hour expiration
 });
 
 const Token = mongoose.model('Token', tokenSchema);
 
 const jwtPrivateKey = process.env.JWTPRIVATEKEY || 'default_private_key';
 
 const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   service: process.env.EMAIL_SERVICE,
   port: Number(process.env.EMAIL_PORT),
   secure: Boolean(process.env.EMAIL_SECURE),
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASS,
   },
 });
 
 async function sendVerificationEmail(email, subject, text) {
   try {
     await transporter.sendMail({
       from: process.env.EMAIL_USER,
       to: email,
       subject: subject,
       text: text,
     });
     console.log("Email sent successfully");
   } catch (error) {
     console.error("Email not sent");
     console.error(error);
   }
 }
 
 app.post('/vikki', async (req, res) => {
   const { error } = validate(req.body);
   if (error) {
     return res.status(400).send({ message: error.details[0].message });
   }
 
   try {
     let user = await Advance.findOne({ email: req.body.email });
 
     if (user) {
       return res.status(409).send({ message: "User with given email already exists" });
     }
 
     const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
     const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
     let verificationToken;
 
     if (user) {
       verificationToken = await new Token({
         userid: user._id,
         token: crypto.randomBytes(32).toString("hex"),
       }).save();
     }
 
     const url = user ? `${process.env.BASE_URL}users/${user._id}/verify/${verificationToken.token}` : '';
 
     if (user) {
       await sendVerificationEmail(user.email, "Verify Email", url);
       res.status(201).send({ message: "An email has been sent to your account. Please verify." });
     } else {
       return res.status(404).send({ message: "User not found" });
     }
 
     const newAdvance = new Advance({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       password: hashedPassword,
     });
 
     await newAdvance.save();
 
     const jwtToken = jwt.sign({ _id: newAdvance._id }, jwtPrivateKey, { expiresIn: '2h' });
 
     res.status(201).send({ token: jwtToken, message: "User created successfully" });
   } catch (err) {
     console.error(err);
     res.status(500).send({ message: "Internal Server Error" });
   }
 });
 
 app.post("/vijay", async (req, res) => {
   try {
     const user = await Advance.findOne({ email: req.body.email });
 
     if (!user) {
       return res.status(401).send({ message: "Invalid email or password" });
     }
 
     const validPassword = await bcrypt.compare(req.body.password, user.password);
     if (!validPassword) {
       return res.status(401).send({ message: "Invalid email or password" });
     }
 
     if (!user.verified) {
       let token = await Token.findOne({ userid: user._id });
 
       if (!token) {
         token = await new Token({
           userid: user._id,
           token: crypto.randomBytes(32).toString("hex"),
         }).save();
       }
 
       const url = `${process.env.BASE_URL}${user._id}/verify/${token.token}`;
       await sendVerificationEmail(user.email, "Verify Email", url);
 
       return res.status(400).send({ message: "An email has been sent to your account. Please verify." });
     }
 
     const jwtToken = jwt.sign({ _id: user._id }, jwtPrivateKey, { expiresIn: '2h' });
     res.status(200).send({ token: jwtToken, message: "Logged in successfully" });
   } catch (err) {
     console.error(err);
     res.status(500).send({ message: "Internal Server Error" });
   }
 });
 
 const validate = (data) => {
   const schema = joi.object({
     firstName: joi.string().required().label("First name"),
     lastName: joi.string().required().label("Last name"),
     email: joi.string().email().required().label("Email"),
     password: joi.string().required().label("Password"),
   });
   return schema.validate(data);
 };
 
 app.listen(port, () => console.log(`Listening on port ${port}`));
 */




 /// its working register
 //
 //email verication also
/*
 
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
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   verificationToken: { type: String } // Uncomment if you want to use verification tokens
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
 
   const options = {
     from: 'vinodkumarvinumk@gmail.com',
     to: email,
     subject: 'THIS IS TESTING EMAIL VERIFICATION FOR VINODKUMAR WEBSITE',
     html: `<h3>HLO USER YOU ARE WELCOME THIS IS VINODKUMAR MK OWNER OF THIS WEBSITE</h3>
            Click the following link to verify your email: http://localhost:5000/verify/${token} 
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
     const { firstName, lastName, email, password } = req.body;
 
     const existingUser = await Advance.findOne({ email });
     if (existingUser) {
       return res.status(400).send('Email already exists');
     }
 
     const verificationToken = crypto.randomBytes(20).toString('hex');
     const hashedPassword = await bcrypt.hash(password, 10);
 
     await Advance.create({ firstName, lastName, email, password: hashedPassword, verificationToken });
 
     sendVerificationEmail(email, verificationToken);
 
     res.send('Registration successful. Please check your email to verify your account.');
   } catch (error) {
     console.error(error);
     res.status(500).send('Internal Server Error');
   }
 });
 
 
 app.listen(port, () => console.log(`Listening on port ${port}`));*/

 /*
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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationToken: { type: String },
  isVerified: { type: Boolean, default: false } // Add this field for account verification
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

  const options = {
    from: 'vinodkumarvinumk@gmail.com',
    to: email,
    subject: 'THIS IS TESTING EMAIL VERIFICATION FOR VINODKUMAR WEBSITE',
    html: `<h3>HLO USER YOU ARE WELCOME THIS IS VINODKUMAR MK OWNER OF THIS WEBSITE</h3>
           Click the following link to verify your email: http://localhost:5000/emailverify/${token} 
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
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Advance.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Advance.create({ firstName, lastName, email, password: hashedPassword, verificationToken });
    
    sendVerificationEmail(email, verificationToken);

    res.send('Registration successful. Please check your email to verify your account.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/emailverify', async (req, res) => {
  try {
    const emailToken = req.body.emailToken;
    if (!emailToken) return res.status(404).json("Email token not found");

    const user = await Advance.findOne({ verificationToken: emailToken });

    if (user) {
      user.verificationToken = null;
      user.isVerified = true;

      await user.save();

      const token = jwt.sign({ userId: user._id }, jwtPrivateKey);

      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
        token
      });
    } else {
      res.status(404).json("Email verification failed. Invalid token");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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

app.listen(port, () => console.log(`Listening on port ${port}`));
*/



/* its working
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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationToken: { type: String },
  isVerified: { type: Boolean, default: true }
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

  const options = {
    from: 'vinodkumarvinumk@gmail.com',
    to: email,
    subject: 'THIS IS TESTING EMAIL VERIFICATION FOR VINODKUMAR WEBSITE',
    html: `<h3>HLO USER YOU ARE WELCOME THIS IS VINODKUMAR MK OWNER OF THIS WEBSITE</h3>
            Click the following link to verify your email: http://localhost:5000/verify/${token} 
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
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Advance.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    await Advance.create({ firstName, lastName, email, password: hashedPassword, verificationToken });

    sendVerificationEmail(email, verificationToken);

    res.send('Registration successful. Please check your email to verify your account.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// ... (your existing code)

app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const user = await Advance.findOne({ verificationToken: token });

    if (user) {
      user.verificationToken = null;
      user.isVerified = true;
      await user.save();
      // Redirect to the login page or send a success message
      res.redirect('http://localhost:5000/login'); // Change the URL as needed
    } else {
      res.status(404).send('Invalid token');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// ... (the rest of your existing code)


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

app.listen(port, () => console.log(`Listening on port ${port}`));
*/
/*const express = require('express');
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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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

  const options = {
    from: 'vinodkumarvinumk@gmail.com',
    to: email,
    subject: 'THIS IS TESTING EMAIL VERIFICATION FOR VINODKUMAR WEBSITE',
    html: `<h3>HLO USER YOU ARE WELCOME THIS IS VINODKUMAR MK OWNER OF THIS WEBSITE</h3>
            Click the following link to verify your email: http://localhost:4040/verify/${token}
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
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Advance.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    await Advance.create({ firstName, lastName, email, password: hashedPassword, verificationToken });

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
      res.redirect('http://localhost:4040/login?verification=success&automaticLogin=false');
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

app.get('/vi', (req, res) => {
  res.send("hello world");
});

app.listen(port, '127.0.0.1', () => console.log(`Listening on port ${port}`));*/

/*app.listen(port, () => console.log(`Listening on port ${port}`));*/
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
const serverAddress = 'http://localhost:4040'; // Use your local IP address

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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Advance.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    await Advance.create({ firstName, lastName, email, password: hashedPassword, verificationToken });

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


