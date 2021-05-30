const { buildQuery } = require('../utils/util');
const { Student, Group } = require('../models');  

exports.getStudents = async (req, res) => {
    const groupId = req.params.group_id;
    const group = await Group.findById(groupId).lean();
    const students = await Student.find({ group_id: groupId }).lean();
    
    res.render('students', { students, groupId, group });
}

exports.createStudentPage = async (req, res) => {
    const groupId = req.params.group_id;
    res.render('create-student', { groupId });
}

exports.getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.id).lean();
    const group = await Group.findById(req.params.group_id).lean();
    res.render('update-student', { student, group });
}

exports.createStudent = async (req, res) => {
    const { fullName } = req.body;
    const { group_id } = req.params;

    const student = {
        fullName: fullName,
        group_id: group_id
    };
    console.log(fullName);
    await Student.create(student);
    
    res.redirect(`/groups/students/${req.params.group_id}`);
}

exports.updateStudentById = async (req, res) => {
    const updated = {
        fullName: req.body.fullName,
        group_id: req.params.group_id
    };
    try {
        const student = await Student.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect(`/groups/students/${req.params.group_id}`);
    } catch(e) {
        console.log(e);
    }
}

exports.deleteStudentById = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        return res.status(200).redirect(`/groups/students/${req.params.group_id}`);
    } catch(e) {
        console.log(e);
    }
}