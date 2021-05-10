const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
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

schema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'subject_id',
});

module.exports = model('Subject', schema);