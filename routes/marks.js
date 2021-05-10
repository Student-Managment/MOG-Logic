const router = require('express').Router();

const Subject = require('../models/Subject');
const Lesson = require('../models/Lesson');
const Mark = require('../models/Mark');

router.get('/', async (req, res) => {
    const marks = await Mark.find().lean();   // findAll()
    const subjects = await Subject().find().lean();
    const students = await Student().find().lean();
    const lessons = await Lesson().find().lean();
    res.render('marks', { marks, subjects, students, lessons });
});

router.get('/create', async (req, res) => {
    const subjects = await Subject().find().lean();
    const students = await Student().find().lean();
    const lessons = await Lesson().find().lean();
    res.render('create-mark', { subjects, students, lessons });
});     // browser-um yerevacox

router.get('/update/:id', async (req, res) => {
    const mark = await Mark.findById(req.params.id).lean();
    const subjects = await Subject().find().lean();
    const students = await Student().find().lean();
    const lessons = await Lesson().find().lean();
    res.render('update-mark', { mark, subjects, students, lessons  });
});

router.post('/create', async (req, res) => {
    const mark = new Mark({
        subject_id: req.body.subject_id,
        lesson_id: req.body.lesson_id,
        group_id: req.body.group_id,
        student_id: req.body.student_id,
        mark: req.body.mark,
        absent: req.body.absent,
    })
    await mark.save();
    res.redirect('/marks');
})                                  // browser-um cherevaox


router.post('/update/:id', async (req, res) => {
    const updated = {
        subject_id: req.body.subject_id,
        lesson_id: req.body.lesson_id,
        group_id: req.body.group_id,
        student_id: req.body.student_id,
        mark: req.body.mark,
        absent: req.body.absent,
    };
    try {
        const mark = await Mark.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect('/marks');
    } catch(e) {
        console.log(e);
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await Mark.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/marks');
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;