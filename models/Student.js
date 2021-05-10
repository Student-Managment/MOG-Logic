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
}, { timestamps: true, versionKey: false });

module.exports = model('Student', schema);