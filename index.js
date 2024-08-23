const express = require("express");
const mongoose = require("mongoose"); 
const dotEnv = require("dotenv");
const cors = require("cors")
const bodyParser = require("body-parser")
const vendorRoutes = require('./routes/vendorRoutes')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')

const app = express();
app.use(cors())
const PORT = 4000;
dotEnv.config(); 

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/suby", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB", error);
});
app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm', firmRoutes)
app.use('/product',productRoutes);
app.use('/uploads', express.static('uploads'));

// Define a route using app.get
app.get("/home", (req, res) => {
  res.send("<h1>Welcome to swiggy</h1>");
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server started and running at http://localhost:${PORT}`);
});
