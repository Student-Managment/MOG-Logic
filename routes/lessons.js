const router =  require('express').Router();
const lessons = require('../controllers/lessons');

router.get('/:subject_id', lessons.getLessons);
router.get('/create/:subject_id', lessons.createLessonPage);
router.get('/:subject_id/:id', lessons.getLessonById);
router.post('/create/:subject_id', lessons.createLesson);
router.post('/:subject_id/:id', lessons.updateLessonById);
router.get('/:subject_id/delete/:id', lessons.deleteLessonById);

module.exports = router;