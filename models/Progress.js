const { Schema, model } = require('mongoose');

const schema = new Schema({
    students_marks: [ 
        { 
            student_id: {
                type: Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            },
            mark: {
                type: Schema.Types.Mixed,
                default: ' '
            }
        } 
    ],
    lesson_id: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

schema.virtual('students', {
    ref: 'Student',
    localField: 'students_marks.student_id',
    foreignField: '_id'
});

schema.virtual('lessons', {
    ref: 'Lesson',
    localField: 'lesson_id',
    foreignField: '_id'
});

module.exports = model('Progress', schema);
