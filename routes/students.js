const router =  require('express').Router();
const students = require('../controllers/students');

router.get('/:group_id', students.getStudents);
router.get('/create/:group_id', students.createStudentPage);
router.get('/:group_id/:id', students.getStudentById);
router.post('/create/:group_id', students.createStudent);
router.post('/:group_id/:id', students.updateStudentById);
router.get('/:group_id/delete/:id', students.deleteStudentById);

module.exports = router;