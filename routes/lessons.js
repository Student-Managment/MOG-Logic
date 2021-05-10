const router = require('express').Router();
const Lesson = require('../models/Lesson');
const Subject = require('../models/Subject');

router.get('/', async (req, res) => {
    const lessons = await Lesson.find().lean();   // findAll()
    res.render('lessons', { lessons });
});

router.get('/create', async (req, res) => {
    const subjects = await Subject.find().lean();
    res.render('create-lesson', { subjects });
});     // browser-um yerevacox

router.get('/update/:id', async (req, res) => {
    const lesson = await Lesson.findById(req.params.id).lean();
    const subjects = await Subject.find().lean();
    res.render('update-lesson', { lesson, subjects });
});

router.post('/create', async (req, res) => {
    const lesson = new Lesson({
        type: req.body.type,
        topic: req.body.topic,
        date: req.body.date,
        subject_id: req.body.subject_id,
    })
    await lesson.save();
    res.redirect('/lessons')
})                                  // browser-um cherevaox


router.post('/update/:id', async (req, res) => {
    const updated = {
        type: req.body.type,
        topic: req.body.topic,
        date: req.body.date,
        subject_id: req.body.subject_id,
    };
    try {
        const lesson = await Lesson.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect('/lessons');
    } catch(e) {
        console.log(e);
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/lessons');
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;