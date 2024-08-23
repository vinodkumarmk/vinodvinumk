/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());

const port = 7000;

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

// Define the schema
const proSchema = new mongoose.Schema({
  empno: { type: Number, required: true },
  empname: { type: String, required: true },
  email:{ type:String, required:true}
});

const Pro = mongoose.model('Project', proSchema, 'pro');

// Middleware setup
app.use(express.json());

// Create a project (not an employee as previously specified)
app.post('/projects', async (req, res) => {
  try {
    const { empno, empname,email } = req.body;
    const newPro = new Pro({ empno, empname,email });
    const savedPro = await newPro.save();
    res.status(201).json(savedPro);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'An error occurred while creating the project' });
  }
});

// Get all projects (not employees as previously specified)
app.get('/projects', async (req, res) => {
  try {
    const projects = await Pro.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ error: 'An error occurred while getting projects' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Get employee by empno
    app.get('/projects/:empno', async (req, res) => {
      const { empno } = req.params;
      try {
        const project = await Pro.findOne({ empno });
        if (!project) {
          res.status(404).json({ error: 'Employee not found' });
          return;
        }
        res.status(200).json(project);
      } catch (error) {
        console.error('Error getting project:', error);
        res.status(500).json({ error: 'An error occurred while getting the project' });
      }
    });

    app.put('/employees/:empno', async (req, res) => {
      const { empno } = req.params;
      const { empname } = req.body; // You can update other fields as needed
    
      try {
        const project = await Pro.findOneAndUpdate({ empno }, { empname }, { new: true });
    
        if (!project) {
          res.status(404).json({ error: 'Project not found' });
          return;
        }
    
        res.status(200).json(project);
      } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'An error occurred while updating the project' });
      }
    });

    app.delete('/projects/:empno', async (req, res) => {
      const { empno } = req.params;
    
      try {
        const project = await Pro.findOneAndDelete({ empno });
    
        if (!project) {
          res.status(404).json({ error: 'Project not found' });
          return;
        }
    
        res.status(200).json({ message: 'Project deleted successfully' });
      } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'An error occurred while deleting the project' });
      }
    });
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });*/
    


   




    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const ejs =  require('ejs')
    const app = express();
    app.use(cors());
    app.use('view engine', 'ejs')
    const port = 7000;
    
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
    
    // Define the schema
    const proSchema = new mongoose.Schema({
      empno: { type: Number, required: true },
      empname: { type: String, required: true },
      email: { type: String, required: true }
    });
    const Pro = mongoose.model('Project', proSchema, 'pro');
    
    
    // Middleware setup
    app.use(express.json());
    
    // Create a project (not an employee as previously specified)
    app.post('/projects', async (req, res) => {
      try {
        const { empno, empname, email } = req.body;
        const newPro = new Pro({ empno, empname, email });
        const savedPro = await newPro.save();
        res.status(201).json(savedPro);
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'An error occurred while creating the project' });
      }
    });
    
    // Get all projects (not employees as previously specified)
    app.get('/projects', async (req, res) => {
      try {
        const projects = await Pro.find();
        res.status(200).json(projects);
      } catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).json({ error: 'An error occurred while getting projects' });
      }
    });
    
    // Get employee by empno
    app.get('/projects/:empno', async (req, res) => {
      const { empno } = req.params;
      try {
        const project = await Pro.findOne({ empno });
        if (!project) {
          res.status(404).json({ error: 'Project not found' });
          return;
        }
        res.status(200).json(project);
      } catch (error) {
        console.error('Error getting project:', error);
        res.status(500).json({ error: 'An error occurred while getting the project' });
      }
    });
    
//     Update a project by empno
    app.put('/projects/:empno', async (req, res) => {
      const { empno } = req.params;
      const { empname } = req.body; // You can update other fields as needed
    
      try {
        const project = await Pro.findOneAndUpdate({ empno }, { empname }, { new: true });
    
        if (!project) {
          res.status(404).json({ error: 'Project not found' });
          return;
        }
    
        res.status(200).json(project);
      } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'An error occurred while updating the project' });
      }
    });
    
    // Delete a project by empno
    app.delete('/projects/:empno', async (req, res) => {
      const { empno } = req.params;
    
      try {
        const project = await Pro.findOneAndDelete({ empno });
    
        if (!project) {
          res.status(404).json({ error: 'Project not found' });
          return;
        }
    
        res.status(200).json({ message: 'Project deleted successfully' });
      } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'An error occurred while deleting the project' });
      }
    });
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    