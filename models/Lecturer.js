const { Schema, model } = require('mongoose');

const schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
});

module.exports = model('Lecturer', schema);