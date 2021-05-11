const router =  require('express').Router();
const subjects = require('../controllers/subjects');

router.get('/', subjects.getSubjects);
router.get('/create', subjects.createSubjectPage);
router.get('/:id', subjects.getSubjectById);
router.post('/create', subjects.createSubject);
router.post('/:id', subjects.updateSubjectById);
router.get('/delete/:id', subjects.deleteSubjectById);

module.exports = router;