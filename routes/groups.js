const { Router } = require('express')
const Group = require('../models/Group')
const router = Router()

router.get('/', async (req, res) => {
    const groups = await Group.find().lean();   // findAll()
    res.render('groups', { groups });
});

router.get('/create', (req, res) => {
    res.render('create-group');
});     // browser-um yerevacox

router.get('/update/:id', async (req, res) => {
    const group = await Group.findById(req.params.id).lean();
    res.render('update-group', { group });
});

router.post('/create', async (req, res) => {
    const group = new Group({
        name: req.body.name,
    })
    await group.save();
    res.redirect('/groups')
})                                  // browser-um cherevaox


router.post('/update/:id', async (req, res) => {
    const updated = {
        name: req.body.name
    };
    try {
        const group = await Group.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect('/groups');
    } catch(e) {
        console.log(e);
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/groups');
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;