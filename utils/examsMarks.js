const { ExamsMark } = require('../models'); 

exports.createExamsMarks = async (subject, students) => {
    const { _id } = subject;
    
    const student_mark = [];

    students.forEach(student => {
        const sm = {
            student_id: student._id,
            mark: ' '
        };

        student_mark.push(sm);
    });

    const examsMarks = {
        subject_id: _id,
        students_marks: student_mark
    };
    
    const created = await ExamsMark.create(examsMarks);
    return created;
  };

exports.createNewExamsMarks = async (students, request) => {
    const { subject_id, student_id, mark } = request;

    const student_mark = [];

    students.forEach(student => {
        for(let i = 0; i < student_id.length; i++){
            if(student._id == student_id[i]) {
                const sm = {
                    student_id: student_id[i],
                    mark: mark[i]
                };
                student_mark.push(sm);
            }
        }
    });

    const examsMarks = {
        subject_id: subject_id,
        students_marks: student_mark
    };
    
    const created = await ExamsMark.create(examsMarks);
    return created;
};