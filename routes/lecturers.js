const router = require('express').Router();
const Lecturer = require('../models/Lecturer');

router.get('/', async (req, res) => {
    const lecturers = await Lecturer.find().lean();   // findAll()
    res.render('lecturers', { lecturers });
});

router.get('/create', (req, res) => {
    res.render('create-lecturer');
});     // browser-um yerevacox

router.get('/update/:id', async (req, res) => {
    const lecturer = await Lecturer.findById(req.params.id).lean();
    res.render('update-lecturer', { lecturer });
});

router.post('/create', async (req, res) => {
    const lecturer = new Lecturer({
        fullName: req.body.fullName,
    })
    await lecturer.save();
    res.redirect('/lecturers')
})                                  // browser-um cherevaox


router.post('/update/:id', async (req, res) => {
    const updated = {
        fullName: req.body.fullName
    };
    try {
        const lecturer = await Lecturer.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect('/lecturers');
    } catch(e) {
        console.log(e);
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await Lecturer.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/lecturers');
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;