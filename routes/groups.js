const router =  require('express').Router();
const groups = require('../controllers/groups');

router.get('/', groups.getGroups);
router.get('/create', groups.createGroupPage);
router.get('/:id', groups.getGroupById);
router.post('/create', groups.createGroup);
router.post('/:id', groups.updateGroupById);
router.get('/delete/:id', groups.deleteGroupById);

module.exports = router;