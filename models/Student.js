const { Schema, model } = require('mongoose');

const schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    toArray: { virtuals: true }
});

schema.virtual('progress', {
    ref: 'Progress',
    localField: '_id',
    foreignField: 'students_marks.student_id',
});

module.exports = model('Student', schema);
