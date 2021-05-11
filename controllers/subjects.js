const { buildQuery } = require('../utils/util');
const { Group, Subject, Lecturer } = require('../models');  

exports.getSubjects = async (req, res) => {
    let queryObject = buildQuery(req.query);

    const subjects = await Subject
                            .find(queryObject)
                            .populate({ path: 'lessons_count' })
                            .populate({ path: 'lessons' })
                            .populate({ path: 'lecturer' })
                            .lean();
    const count = await Subject.countDocuments(queryObject);

    console.log(subjects);
    res.render('subjects', { subjects, count });
}

exports.createSubjectPage = async (req, res) => {
    const lecturers = await Lecturer.find().lean();
    const groups = await Group.find().lean();
    res.render('create-subject', { lecturers, groups });
}

exports.getSubjectById = async (req, res) => {
    const subject = await Subject.findById(req.params.id).lean();
    const lecturers = await Lecturer.find().lean();
    const groups = await Group.find().lean();
    res.render('update-subject', { subject, lecturers, groups });
}

exports.createSubject = async (req, res) => {
    const subject = new Subject({
        name: req.body.name,
        group_id: req.body.group_id
    })
    await subject.save();
    res.redirect('/subjects')
}

exports.updateSubjectById = async (req, res) => {
    const updated = {
        name: req.body.name,
        group_id: req.body.group_id
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
}

exports.deleteSubjectById = async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/subjects');
    } catch(e) {
        console.log(e);
    }
}
