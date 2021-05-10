const { Router } = require('express')
const Subject = require('../models/Subject')
const router = Router()

router.get('/', async (req, res) => {
    const subjects = await Subject.find().lean();   // findAll()
    res.render('subjects', { subjects });
});

router.get('/create', (req, res) => {
    res.render('create-subject');
});     // browser-um yerevacox

router.get('/update/:id', async (req, res) => {
    const subject = await Subject.findById(req.params.id).lean();
    res.render('update-subject', { subject });
});

router.post('/create', async (req, res) => {
    const subject = new Subject({
        name: req.body.name,
    })
    console.log(subject);
    await subject.save();
    res.redirect('/subjects')
})                                  // browser-um cherevaox


router.post('/update/:id', async (req, res) => {
    const updated = {
        name: req.body.name
    };
    try {
        const subject = await Subject.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect('/subjects');
    } catch(e) {
        console.log(e);
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/subjects');
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;