// CLI COMMEND LINE INTERFACE
/*cosole.log("hello world" )

function addNumber(a,b){
    console.log(a+b)
}
addNumber(150, 250)
*/

//BUILT IN MODULE
/*const os = require('os')
const path = require('path')
console.log(path.dirname(__filename))
console.log(os.type())
console.log(os.version())
console.log(os.freemem())
console.log(os.cpus())
console.log(__dirname)
console.log(__filename)
console.log(path.parse(__filename))*/

// FS MODULE 
const fs = require('fs')
/*fs.readFile("practicedeme.txt", 'utf8', (err, data)=>{

    if(err){
      console.log(err)
    }
    console.log(data)
})
// dynamic ga file create cheyadaniki
fs.writeFile("pra.html", 'utf',(err)=>{
    if(err){
console.log(err)
    }
    console.log('file created succesfully')
})
*/
/*const contentsample = "my name is kalyan iam creating dynamic website"
fs.writeFile('pra.html',contentsample,(err)=>{
    if(err){
  console.log(err)
    }else{
        console.log("file content is success")
    }
})*/


/*fs.rename('pra.html',"newchanged.js",(err)=>{
    if(err){
  console.log(err)
    }else{
        console.log("modified success")
    }
})
*/

/*fs.unlink('newchanged.js',(err)=>{
    if(err){
console.log(err)
    }else {
        console.log("file detae successfully")
    }
})
*/

// CLIENT SERVER COMMUNICATION
/*const http = require('http')

 const myServer = http.createServer((request, response)=>{
response.write("welcome to server ")
response.end()
})
myServer.listen(5000)
*/

/*const http = require('http')
const mybook = http.createServer((request, response)=>{
    response.write("welcome to server  vinodkumark")
    response.end()
})
mybook.listen(5000)*/

/*// LOCAL MODULE 
function addNumber(a,b){
return a+b
}
function subTractNumber(a,b){                               // export cheyadaniki
                                                        // module.exports =  {addNumber , subTractNumber, multiplyNumber, divideNumber}
    return a-b                                                   //import cheyadaniki
                                                           //     const {addNumber, subTractNumber, divideNumber, multiplyNumber} = require("practice")
    }


 


    function divideNumber(a,b){
        return a/b
        }

        function multiplyNumber(a,b){
            return a*b
            }
console.log(addNumber(10,11))
console.log(subTractNumber(10,11))
console.log(multiplyNumber(10,11))
console.log(divideNumber(10,11))
*/
// EXPRESS JS

//console.log("welcome to expresss js")

//CREATE WEB SERVER
/*const express = require("express")
const app = express()
const port = 5000



app.get('/apple',(req,res)=>{
res.send("hi vinod enter the world")
})
  app.listen(port,()=>{
    console.log("server start and running successfully")
  })


const express = require("express")
const app = express()
const port = 5000


app.get('/vinod', (req,res)=>{
    res.send("hlo vinodkumar mk this is ur robat")
})
app.listen(port,()=>{
    console.log("server is running")
})
*/

//MIDDLEWERE
/*
const express = require("express")
const app = express()
const port = 5000


 const firstHandler = ((req,res,next)=>{
    if(10<20){
        next()
    }
})

const secondHandler = ((req,res,next)=>{
    if(10>20){
        next()
    }else{
        console.log("sorry ur not alllowed")
    }
})

const thirdHandler = ((req,res,next)=>{
    if(30<40){
        next()
    }
})

app.get('/home',firstHandler,  (req,res)=>{
    res.send("hello, iam home page")
})

app.get('/about',secondHandler, (req,res)=>{
    res.send("this is about page")
})

app.get('/user/:121',thirdHandler, (req,res)=>{
    res.send("ur serached for 121")
})
app.listen(port,()=>{
    console.log("server is running")
})


CONNECT TO MONGODB  AND IAM USING MONGODB CAMPUS
*/
/*const express = require("express")
const app = express()

const mongoose = require('mongoose');
const dotEnv = require('dotenv')


const PORT = 5000

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB', error);
    });

app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`)
})
*/
/*dotEnv.config()
MongoClient.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongo db connneced successfully")
})
.catch((error)=>{
    console.log("error", error)
})
*/

// REST API    ///////////////////////////////////////////// POST OPERATION ////////////////////////////////////////
/*const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
//const cors = require('cors');
//const bodyParser = require('body-parser');

const app = express()
//app.use(cors());
const PORT =  5000

//app.use(bodyParser.json())
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practice', {
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
    const restSchema = new mongoose.Schema({
        name: { type: String, required: true },                          ///
        email: { type: String, required: true },                        ///   MODEL
        phone: { type: Number, required: true },                        ///
        city: { type: String, required: true }
      });

      // Middleware setup
    app.use(express.json());


      const Rest = mongoose.model('Practice', restSchema, 'rest');

     ROUTES // methode //router confuse avvadhu                          /// ROUTESS
      app.post('/vikki', async(req, res)=>{
        try {
             const { name, email, phone, city } = req.body;                        /////
            const newRest = new Rest({ name, email,phone, city });                  /////  CONTROLLER
            const savedRest = await newRest.save();                                //////
            res.status(201).json(savedRest);
        } catch (error) {
          console.error('Error creating practice:', error);
            res.status(500).json({ error: 'An error occurred while creating the practice' });
        }
      })
      app.listen(PORT, (()=>{
    console.log(`server started and running at ${PORT}`)
}))
*/

///////////////////////////////////////////////////   GET   AND API INTERGATION
/* const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practice', {
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
const restSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    city: { type: String, required: true }
});

// Define the model
const Rest = mongoose.model('Practice', restSchema, 'rest');

// Middleware setup
app.use(express.json());

// POST operation to create a new practice
app.post('/practice', async (req, res) => {
    try {
        const { name, email, phone, city } = req.body;
        const newRest = new Rest({ name, email, phone, city });
        const savedRest = await newRest.save();
        res.status(201).json(savedRest);
    } catch (error) {
        console.error('Error creating practice:', error);
        res.status(500).json({ error: 'An error occurred while creating the practice' });
    }
});

// GET operation
app.get('/practice', async (req, res) => {
    try {
        const practice = await Rest.find();
        res.status(200).json(practice);
    } catch (error) {
        console.error('Error getting practices:', error);
        res.status(500).json({ error: 'An error occurred while getting practices' });
    }
});

// get operation by id 
app.get('/practice/:id', async(req, res)=>{
    try {
        const practice = await Rest.findById(req.params.id)
        if(!practice){
            return res.status(404).json({message: "practice not found"})
        }
        res.status(200).json(practice)
    } catch (error) {
        console.error("threre is an error", error)
        res.status(500).json({messgae: "server error"})
    }
})
// put operation
app.put('/ajay/:id', async (req,res)=>{
    try {
        const {name, email, phone, city} = req.body
        const practice = await Rest.findByIdAndUpdate(
            req.params.id, 
            {name, email, phone, city}
        )
        if(!practice){
           return  res.status(404).json({message: "practice not found"})
        }
        res.status(200).json(practice)
    } catch (error) {
        console.error('there is an error', error)
        res.status(500).json({message: "server is an error"})
    }
})

// delete operation
app.delete('/vikranth/:id', async( req, res)=>{
    try {
        const practice = await Rest.findByIdAndDelete(
            req.params.id,
            res.status(204).send()
        )
    } catch (error) {
     console.error('three is an error: ' , error)
     res.status(500).json({message: "server error"})   
    }
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server started and running at http://localhost:${PORT}`);
});
*/

// server side rendaring
/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practice', {
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
const restSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    city: { type: String, required: true }
});

// Define the model
const Rest = mongoose.model('Practice', restSchema, 'rest');

// Middleware setup
app.use(express.json());

// POST operation to create a new practice
app.post('/practice', async (req, res) => {
    try {
        const { name, email, phone, city } = req.body;
        const newRest = new Rest({ name, email, phone, city });
        const savedRest = await newRest.save();
        res.status(201).json(savedRest);
    } catch (error) {
        console.error('Error creating practice:', error);
        res.status(500).json({ error: 'An error occurred while creating the practice' });
    
    }
});
app.listen(PORT, () => {
    console.log(`Server started and running at http://localhost:${PORT}`);
});
*/

//login 

/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 5000;


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practice', {
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
const restSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }, // Changed type to String
    city: { type: String, required: true },
});


// Define the model
const Rest = mongoose.model('Practice', restSchema, 'rest');


// Middleware setup
app.use(express.json());

// POST operation to create a new practice
app.post('/practice', async(req, res) => {
    try {
        const { name, email, phone, city } = req.body;
        const newRest = new Rest({ name, email, phone, city });
        const savedRest = await newRest.save();
        res.status(201).json(savedRest);
    } catch (error) {
        console.error('Error creating practice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// login

   app.post('/login', async (req, res) => {
    try {
    const { email, phone } = req.body;
    // Check if both email and phone are provided

    if (!email || !phone) {
     return res.status(400).json({ error: 'Both email and phone are required' });
    }
    // Check if the user exists in the database
    const existingUser = await Rest.findOne({ email, phone });

   if (!existingUser) {
   return res.status(404).json({ error : 'User not found' }) ;
  }
        // Here you might perform additional checks like password validation
        // Respond with a success message or authentication token
                     return res.status(200).json({ message : 'Login successful' }) ;        
                } catch (error) {

                 console.error('Login error:', error) ;
                     return res.status(500).json({ error : 'Internal server error' }) ;
    }
});


                        app.listen(PORT, (  ) => {
                              console.log(`Server started and running at http://localhost:${PORT}`);
                                                                                                          });



*/

//jwt token

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotEnv = require('dotenv')
const ejs = require("ejs")
const app = express();
app.use(cors());
const PORT = 8000;

app.use(express.json)
dotEnv.config()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))


const secretekey = process.env.mysecreatKey
// user create
const users = [{
    id:"1",
    username:"mahesh",
    password: "mahesh",
    isAdmin:true
},
{
    id:"2",
    username:"suresh",
    password:"suresh",
    isAdmin: false
}
]

const verifyUser = (req, res, next)=>{
    const userToken = req.headers.authorization
    if(userToken){
 const token = userToken.split("") [1]
 jwt.verify(token, secretekey, (err, user)=>{
    if(err){
        return  res.status(403). json({err: "token is not valid"})
    }
    req.user = user
    next()
 })
    }else{
 res.status(401).json("user  not aunteicate")
    }
}

app.post('/login', (req, res)=>{
    const{ username, password}= req.body

    const user = user.find((person)=>{
        return person.username = username && person.password === password

    })
  // admin avna  kadha confirm chesikovadaniki
  if(user){
    const accessToken = jwt.sign({
        id: user.id,
        id:user.id, isAdmin:user.isAdmin,
        isAdmin: user.isAdmin
    }, secretekey )

    res.json({
        username: user.username,
        isAdmin: user.isAdmin,
        accessToken
    })
  }else{
    res.status(401).json("user  credinal not found")
  }

  // delete
  app.delete('/user/:userId', verifyUser,  (req,res)=>{
    if(req.user.id === req.params.userId || req.user.isAdmin){
        res.status(200).json("user deleted successfully")
    }else{
        res.status(401).json("you are not allowed delete")
    }
  })
})
app.get("/mahesh", (req,res)=>{
    res.render("mahesh")
})

app.get("/suresh", (req,res)=>{
    res.render("suresh")
})

app.get('/login/:userId',(req,res)=>{
const userId = req.params.userId
if(userId){
    if(userId === "1")
    res.redirect('/mahesh')
}else if(userId === "2"){
res.redirect("/suresh")
}else{
    res.status(403).json("user not found")
}
} )
app.post("/logout", (req, res)=>{
    if (userToken) {
        const token  = userToken.split("")[1]

        if(token){
           let allTokens = []
           const tokenIndex = allTokens.indexOf(token)
           if(tokenIndex !== -1){
            allTokens.splice(tokenIndex, 1)
            res.status(200).json("logout successfull!")
           }else{
            res.status(400).json("you are not valid use")
           }
        }else{
      res.status(400).json("token not found")
        }
    }else{
res.status(400).json("you are not autenticated")
    }
})

app.get('/logout', (req,res)=>{
    res.redirect('/')
})

app.get('/', (req,res)=>{
    res.render('/welcome')
})

app.get('/vinod', (req,res)=>{
    res.send("hlo vinodkumar mk this is ur robat")
})
app.listen(PORT, (  ) => {
    console.log(`Server started and running at http://localhost:${PORT}`);
 });