const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    credit_1: {
        type: Number,
        required: true
    },
    credit_2: {
        type: Number,
        required: true
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    lecturer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Lecturer',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

schema.virtual('lessons_count', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'subject_id',
    count: true,
});

schema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'subject_id',
});

schema.virtual('lecturer', {
    ref: 'Lecturer',
    localField: 'lecturer_id',
    foreignField: '_id',
    justOne: true
});

module.exports = model('Subject', schema);