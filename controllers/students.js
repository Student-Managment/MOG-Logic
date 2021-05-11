const { buildQuery } = require('../utils/util');
const { Student, Group } = require('../models');  

exports.getStudents = async (req, res) => {
    const groupID = req.params.group_id;
    const group = await Group.findById(groupID).lean();
    const students = await Student.find({ group_id: groupID }).lean();
    
    res.render('students', { students, groupID, group });
}

exports.createStudentPage = async (req, res) => {
    const groupID = req.params.group_id;
    res.render('create-student', { groupID });
}

exports.getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.id).lean();
    const group = await Group.findById(req.params.group_id).lean();
    res.render('update-student', { student, group });
}

exports.createStudent = async (req, res) => {
    const student = new Student({
        fullName: req.body.fullName,
        group_id: req.params.group_id
    })
    console.log(student);
    await student.save();
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