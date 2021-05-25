const { buildQuery } = require('../utils/util');
const { createProgress } = require('../utils/progress');
const { Subject, Lesson, Student, Group } = require('../models'); 
 
exports.getLessons = async (req, res) => {
    const subId = req.params.subject_id;
    const subject = await Subject.findById(subId).lean();
    const lessons = await Lesson.find({ subject_id: subId }).lean();
    res.render('lessons', { lessons, subId, subject });
}

exports.createLessonPage = async (req, res) => {
    const subId = req.params.subject_id;
    res.render('create-lesson', { subId });
}

exports.getLessonById = async (req, res) => {
    const lesson = await Lesson.findById(req.params.id).lean();
    const subject = await Subject.findById(req.params.subject_id).lean();
    res.render('update-lesson', { lesson, subject });
}

exports.createLesson = async (req, res) => {
    const subject = await Subject.findById(req.params.subject_id).lean();
    const group = await Group.findById(subject.group_id);

    const students = await Student.find({ group_id: group._id });    

    const lesson = await Lesson.create({
        type: req.body.type,
        topic: req.body.topic,
        date: req.body.date,
        subject_id: req.params.subject_id,
    });
    createProgress(lesson, students);

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
