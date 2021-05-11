const router =  require('express').Router();
const lecturers = require('../controllers/lecturers');

router.get('/', lecturers.getLecturers);
router.get('/create', lecturers.createLecturerPage);
router.post('/create', lecturers.createLecturer); 
router.get('/:id', lecturers.getLecturerById);
router.post('/:id', lecturers.updateLecturerById);
router.get('/delete/:id', lecturers.deleteLecturerById);

module.exports = router;