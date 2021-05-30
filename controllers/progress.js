const { buildQuery } = require('../utils/util');
const { createNewProgress } = require('../utils/progress');
const { Progress, Group, Subject, Lesson, Student, Lecturer } = require('../models');  

exports.getProgress = async (req, res) => {

    try {
        const subId = req.params.subject_id;
        const subject = await Subject.findById(subId).lean();
        
        const groupId = subject.group_id;
        const group = await Group.findById(groupId).lean();

        const lecturerId = subject.lecturer_id;
        const lecturer = await Lecturer.findById(lecturerId).lean();
        
        const lessons = await Lesson
                                .find({ subject_id: subId })
                                .lean();

        const exams = await Lesson
                                .find({ 
                                    subject_id: subId, 
                                    type: { $in: ['Քննություն1', 'Քննություն2'] }
                                })
                                .select('_id type')
                                .lean();
        const students = await Student
                                .find({ group_id: groupId })
                                // .populate({ path: 'progress', model: Progress })
                                .lean();

        const studentsCount = await Student.countDocuments({group_id: groupId});

        const progresses = await Progress
                                    .find({
                                        lesson_id: { $in: lessons.map(lesson => lesson._id) } 
                                    })
                                    .populate({ path: 'lesson_id', select: 'type' })
                                    .sort({lesson_id: 1})
                                    .lean();
        const progressesExams = await Progress
                                    .find({
                                        lesson_id: { $in: exams.map(lesson => lesson._id) } 
                                    })
                                    .populate({ path: 'lesson_id', select: 'type' })
                                    .sort({lesson_id: 1})
                                    .lean();

        // console.log('progresses: ', progresses);
        // const mogs = [];
        // progressesExams.map(progressExam => {
        //     console.log('progressExam marks: ', progressExam.students_marks);            
        // })

        // const mogs = await calculateMogs(subject, students, progressesExams);
        // console.log('mogs: ', mogs);

        res.render('progress', { subId, subject, group, lecturer, lessons, students, progresses, progressesExams, studentsCount });

    } catch(e) {
        console.log(e);
    }
}

exports.updateProgressById = async (req, res) => {
    const mark = req.body.mark;
    const lessonId = req.body.lesson_id;
    const studentId = req.body.student_id;

    const subId = req.params.subject_id;
    const subject = await Subject.findById(subId).lean();
    
    const groupId = subject.group_id;

    const progressId = req.params.id;

    const students = await Student
                            .find({ group_id: groupId })
                            .lean();
    
    const request = {
        lesson_id: lessonId,
        student_id: studentId,
        mark: mark
    };
    
    try {
        await Progress.findByIdAndDelete(progressId);
        await createNewProgress(students, request);

        return res.status(200).redirect(`/subjects/progress/${subId}`);
    } catch(e) {
        console.log(e);
    }
}
