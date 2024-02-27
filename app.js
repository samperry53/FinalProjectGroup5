const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/course');
const { render } = require('ejs');
const bodyParser = require('body-parser');
const router = express.Router();
const courseController = require('./controllers/courseController');
const const courseRoutes = require('./routes/courseRoutes');

// connect to mongodb
const dbURI = 'mongodb+srv://sperry53:help@finalprojectgroup5.mieuiqn.mongodb.net/?retryWrites=true&w=majority&appName=FinalProjectGroup5';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// express app
const app = express();
const port = 3001;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
  });

  app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
  });
  
  app.use(morgan('dev'));
  
  app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

// Define route for rendering the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Define route for rendering the staff page
app.get('/staff', (req, res) => {
    res.render('staff');
});

// Define route for rendering the students page
app.get('/students', (req, res) => {
    res.render('students');
});

// Render courses for non-staff view
app.get('/courses', (req, res) => {
    Course.find()
      .then(courses => {
        res.render('courses', { title: 'Courses', courses });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  });

// Route to render the individual course page
app.get('/course/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Fetching course details for ID ${id}`);
    Course.findById(id)
      .then(course => {
        console.log('Course details:', course);
        res.render('course', { course, title: `Course: ${course.courseName}` });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  });




// Define route for rendering the courses page
app.get('/courses', (req, res) => {
    res.render('courses');
});

// Create a new course
router.post('/courses', courseController.createCourse);

// Get all courses
router.get('/courses', courseController.getAllCourses);

// Get a single course by ID
router.get('/courses/:id', courseController.getCourseById);

// Update a course by ID
router.put('/courses/:id', courseController.updateCourseById);

// Delete a course by ID
router.delete('/courses/:id', courseController.deleteCourseById);

module.exports = router;

// // course routes
// app.get('/courses', (req, res) => {
//     Course.find().sort({ createdAt: -1 })
//       .then((result) => {
//         res.render('index', { title: 'All Courses', courses: result })
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   })
  
//   app.post('/courses', (req, res) => {
//     const course = new Course(req.body);
  
//     course.save()
//       .then((result) => {
//         res.redirect('/courses');
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   })
  
//   app.get('/course/:id', (req, res) => {
//     const id = req.params.id;
//     Course.findById(id)
//       .then(result => {
//         res.render('details', { course: result, title: 'Course Details' });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   })
  
//   app.delete('/courses/:id', (req, res) => {
//     const id = req.params.id;
  
//     Course.findByIdAndDelete(id)
//       .then(result => {
//         res.json({ redirect: '/courses' })
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   })
  
  
//   app.get('/courses/create', (req, res) => {
//     res.render('create', { title: 'Create a new course' });
//   });


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
