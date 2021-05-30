const router = require('express').Router();

const groupsRoutes = require('./groups');
const subjectsRoutes = require('./subjects');
const studentsRoutes = require('./students');
const lecturersRoutes = require('./lecturers');
const lessonsRoutes = require('./lessons');
const progressRoutes = require('./progress');
const examsMarksRoutes = require('./examsMarks');

router.use('/groups', groupsRoutes);
router.use('/groups/exams-marks', examsMarksRoutes);
router.use('/groups/subjects', subjectsRoutes);
router.use('/groups/students', studentsRoutes);
router.use('/lecturers', lecturersRoutes);
router.use('/subjects/lessons', lessonsRoutes);
router.use('/subjects/progress', progressRoutes);

module.exports = { router };