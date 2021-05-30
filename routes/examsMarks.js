const router =  require('express').Router();
const examsMarks = require('../controllers/examsMarks');

router.get('/:group_id', examsMarks.getExamsMarks);
router.post('/:group_id/:id', examsMarks.updateExamsMarksById);
// router.get('/create/:group_id', subjects.createSubjectPage);
// router.get('/:group_id/:id', subjects.getSubjectById);
// router.post('/create/:group_id', subjects.createSubject);
// router.post('/:group_id/:id', subjects.updateSubjectById);
// router.get('/:group_id/delete/:id', subjects.deleteSubjectById);

module.exports = router;