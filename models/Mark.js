const { Schema, model } = require('mongoose');

const schema = new Schema({
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    lesson_id: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    mark: {
        type: Number,
    },
    absent: {
        type: String
    }

}, { timestamps: true, versionKey: false });



module.exports = model('Mark', schema);