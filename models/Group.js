const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    course: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

schema.virtual('students_count', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'group_id',
    count: true,
});

schema.virtual('students', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'group_id',
});

schema.virtual('subjects', {
    ref: 'Subject',
    localField: '_id',
    foreignField: 'group_id',
});

module.exports = model('Group', schema);