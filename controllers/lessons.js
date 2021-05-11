const { buildQuery } = require('../utils/util');
const { Subject, Lesson } = require('../models');  

exports.getLessons = async (req, res) => {
    const subID = req.params.subject_id;
    const lessons = await Lesson.find({ subject_id: subID }).lean();
    res.render('lessons', { lessons, subID });
}

exports.createLessonPage = async (req, res) => {
    const subID = req.params.subject_id;
    res.render('create-lesson', { subID });
}

exports.getLessonById = async (req, res) => {
    const lesson = await Lesson.findById(req.params.id).lean();
    const subject = await Subject.findById(req.params.subject_id).lean();
    res.render('update-lesson', { lesson, subject });
}

exports.createLesson = async (req, res) => {
    const lesson = new Lesson({
        type: req.body.type,
        topic: req.body.topic,
        date: req.body.date,
        subject_id: req.params.subject_id,
    })
    await lesson.save();
    res.redirect(`/subjects/lessons/${req.params.subject_id}`);
}

exports.updateLessonById = async (req, res) => {
    const updated = {
        type: req.body.type,
        topic: req.body.topic,
        date: req.body.date,
        subject_id: req.params.subject_id,
    };
    try {
        const lesson = await Lesson.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect(`/subjects/lessons/${req.params.subject_id}`);
    } catch(e) {
        console.log(e);
    }
}

exports.deleteLessonById = async (req, res) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        return res.status(200).redirect(`/subjects/lessons/${req.params.subject_id}`);
    } catch(e) {
        console.log(e);
    }
}
