const router =  require('express').Router();
const progress = require('../controllers/progress');

router.get('/:subject_id', progress.getProgress);
router.post('/:subject_id/:id', progress.updateProgressById);
// router.post('/average/:subject_id', progress.getAverages);

// router.post('/create/:subject_id', progress.createProgress);
// router.get('/create/:subject_id', lessons.createProgressLine);
// router.get('/:subject_id/:id', lessons.getProgressById);
// router.get('/:subject_id/delete/:id', lessons.deleteLessonById);

module.exports = router;