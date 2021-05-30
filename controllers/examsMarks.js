const { buildQuery } = require('../utils/util');
const { createNewExamsMarks } = require('../utils/examsMarks');
const { Group, Subject, Student, ExamsMark } = require('../models');  

exports.getExamsMarks = async (req, res) => {

    try {
        
        const groupId = req.params.group_id;
        const group = await Group.findById(groupId).lean();
        
        const subjects = await Subject
                                .find({ group_id: groupId })
                                .lean();

        const students = await Student
                                .find({ group_id: groupId })
                                // .populate({ path: 'progress', model: Progress })
                                .lean();

        const studentsCount = await Student.countDocuments({group_id: groupId});

        const examsMarks = await ExamsMark
                                    .find({
                                        subject_id: { $in: subjects.map(subject => subject._id) } 
                                    })
                                    .populate({ path: 'subject_id', select: 'name credit_1 credit_2' })
                                    .sort({subject_id: 1})
                                    .lean();

        res.render('exams-marks', { groupId, group, subjects, students, examsMarks, studentsCount });

    } catch(e) {
        console.log(e);
    }
}

exports.updateExamsMarksById = async (req, res) => {
    const mark = req.body.mark;
    const subjectId = req.body.subject_id;
    const studentId = req.body.student_id;
    
    console.log('req.body: ', req.body);

    const groupId = req.params.group_id;

    const examMarkId = req.params.id;

    const students = await Student
                            .find({ group_id: groupId })
                            .lean();
    
    const request = {
        subject_id: subjectId,
        student_id: studentId,
        mark: mark
    };
    
    try {
        await ExamsMark.findByIdAndDelete(examMarkId);
        await createNewExamsMarks(students, request);

        return res.status(200).redirect(`/groups/exams-marks/${groupId}`);
    } catch(e) {
        console.log(e);
    }
}
