const { Schema, model } = require('mongoose');

const schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
});

module.exports = model('Lecturer', schema);