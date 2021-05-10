const router = require('express').Router();

const groupsRoutes = require('./groups');
const subjectsRoutes = require('./subjects');
const studentsRoutes = require('./students');
const lecturersRoutes = require('./lecturers');
const lessonsRoutes = require('./lessons');

router.use('/groups', groupsRoutes);
router.use('/subjects', subjectsRoutes);
router.use('/students', studentsRoutes);
router.use('/lecturers', lecturersRoutes);
router.use('/lessons', lessonsRoutes);

module.exports = { router };