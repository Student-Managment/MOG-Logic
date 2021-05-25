const { buildQuery } = require('../utils/util');
const { Group, Subject, Lecturer } = require('../models');  


exports.getSubjects = async (req, res) => {
    const groupId = req.params.group_id;
    const group = await Group.findById(groupId).lean();
    
    // const subjects = await Subject.find({group_id: groupId}).lean();


    const subjects = await Subject
                            .find({group_id: groupId})
                            .populate({ path: 'lessons_count' })
                            .populate({ path: 'lessons' })
                            .populate('lecturer')
                            .lean();
    const count = await Subject.countDocuments({group_id: groupId});

    res.render('subjects', { group, subjects, count });
}

exports.createSubjectPage = async (req, res) => {
    const groupId = req.params.group_id;
    const lecturers = await Lecturer.find().lean();

    res.render('create-subject', { lecturers, groupId });
}

exports.getSubjectById = async (req, res) => {
    const groupId = req.params.group_id;
    const lecturers = await Lecturer.find().lean();
    const subject = await Subject.findById(req.params.id).lean();

    res.render('update-subject', { subject, lecturers, groupId });
}

exports.createSubject = async (req, res) => {
    const subject = new Subject({
        name: req.body.name,
        credit_1: req.body.credit_1,
        credit_2: req.body.credit_2,
        lecturer_id: req.body.lecturer_id,
        group_id: req.params.group_id
    })
    await subject.save();
    res.redirect(`/groups/subjects/${req.params.group_id}`);
}

exports.updateSubjectById = async (req, res) => {
    const updated = {
        name: req.body.name,
        credit_1: req.body.credit_1,
        credit_2: req.body.credit_2,
        lecturer_id: req.body.lecturer_id,
        group_id: req.params.group_id
    };
    try {
        const subject = await Subject.update(
            {_id: req.params.id},
            {$set: updated},
            {
                new: true,
                upsert: true,
                // multiple: true
            }
        );
        return res.status(200).redirect(`/groups/subjects/${req.params.group_id}`);
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
