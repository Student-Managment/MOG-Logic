const { Progress } = require('../models'); 

exports.deleteAllInProgress = async (progressId) => {
    const deleted = await Progress.findByIdAndDelete(progressId);
    return deleted;
  };

exports.createProgress = async (lesson, students) => {
    const { _id } = lesson;
    
    const student_mark = [];

    students.forEach(student => {
        const sm = {
            student_id: student._id,
            mark: ' '
        };

        student_mark.push(sm);
    });

    const progress = {
        lesson_id: _id,
        students_marks: student_mark
    };
    
    const created = await Progress.create(progress);
    return created;
  };

exports.createNewProgress = async (students, request) => {
    const { lesson_id, student_id, mark } = request;

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

    const progress = {
        lesson_id: lesson_id,
        students_marks: student_mark
    };
    
    const created = await Progress.create(progress);
    return created;
};
                                 

// @EXAMS (LESSONS):      [{_id:'', type:''}]
// @PROGRESES EXAMS:      [{
//                         _id: '', 
//                         lesson_id,
//                         students_marks: [{
//                                           _id: '',
//                                           student_id: '',
//                                           mark: 5
//                                         }]
//                       }]

//  A N A V A R T
exports.calculateMogs = async (subject, students, progressesExams) => {
    const {credit_1, credit_2} = subject;

    const averages = [];

    progressesExams.forEach(progressExam => {
        const studentsMarks = progressExam.students_marks;
        const type = progressExam.lesson_id.type;
        
        for(let i = 0; i < studentsMarks.length; i++) {
            students.forEach(student => {
                if(student._id == studentsMarks[i].student_id) {
                    const studentExams = [];
    
                    if(type == 'Քննություն1') {
                        const markMultiplyCredit1 = studentsMarks[i].mark * credit_1;
                        studentExams.push(markMultiplyCredit1);
                        // console.log('markMultiplyCredit1[i]: ', markMultiplyCredit1);
                    } else {
                        const markMultiplyCredit2 = studentsMarks[i].mark * credit_2;
                        studentExams.push(markMultiplyCredit2);
                        // console.log('markMultiplyCredit2[i]: ', markMultiplyCredit2);
                    }

                    console.log('studentExams[i]: ', studentExams);
                    const marksSum =+ studentExams[i];
                    const avg = Math.floor(marksSum / studentsMarks.length);

                    const studentAvg = {
                        student_id: studentsMarks[i].student_id,
                        average: avg
                    };
                    averages.push(studentAvg);
                }
                
            })
        }

        // console.log('averages: ', averages);
    });
    return averages;
}