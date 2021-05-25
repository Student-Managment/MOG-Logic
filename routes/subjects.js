const router =  require('express').Router();
const subjects = require('../controllers/subjects');

router.get('/:group_id', subjects.getSubjects);
router.get('/create/:group_id', subjects.createSubjectPage);
router.get('/:group_id/:id', subjects.getSubjectById);
router.post('/create/:group_id', subjects.createSubject);
router.post('/:group_id/:id', subjects.updateSubjectById);
router.get('/:group_id/delete/:id', subjects.deleteSubjectById);

module.exports = router;