const express = require('express');

// express app
const app = express();
const port = 3000;

// // listen for requests
// app.listen(3000);

// app.get('/', (req, res) => {
//     // res.send('<p>home page</p>');
//     res.sendFile('./views/index.ejs', { root: __dirname});
// });

// app.get('/about', (req, res) => {
//     // res.send('<p>about page</p>');
//     res.sendFile('./views/about.html', { root: __dirname});
// });

// // redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });



// // 404 page
// app.use((req, res) => {
//     res.status(404).sendFile('./views/404.html', { root: __dirname})
// });

// Set EJS as the view engine
app.set('view engine', 'ejs');

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

// Define route for rendering the courses page
app.get('/courses', (req, res) => {
    res.render('courses');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

