// courseController.js

const Course = require('../models/course');

// Controller function to create a new course
exports.createCourse = async (req, res) => {
    try {
        const { courseName, description, subjectArea, credits } = req.body;
        const newCourse = await Course.create({ courseName, description, subjectArea, credits });
        res.status(201).json({ success: true, data: newCourse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller function to get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller function to get a single course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller function to update a course by ID
exports.updateCourseById = async (req, res) => {
    try {
        const { courseName, description, subjectArea, credits } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { courseName, description, subjectArea, credits }, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }
        res.status(200).json({ success: true, data: updatedCourse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller function to delete a course by ID
exports.deleteCourseById = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }
        res.status(200).json({ success: true, data: deletedCourse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller function to render form for updating course details
exports.renderEditCourseForm = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('editCourse', { course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update course details
exports.updateCourse = async (req, res) => {
    try {
        const { courseName, description, subjectArea, credits } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { courseName, description, subjectArea, credits }, { new: true });
        res.redirect('/courses'); // Redirect to course listing page
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a course
exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.redirect('/courses'); // Redirect to course listing page
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};