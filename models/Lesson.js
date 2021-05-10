const { Schema, model } = require('mongoose');

const schema = new Schema({
    type: {
        type: String,
        enum: ['Դասախոսություն', 'Գործնական', 'Լաբորատոր', 'Միջանկյալ', 'Ստուգարք', 'Քննություն'],
        default: 'Դասախոսություն',
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
});

module.exports = model('Lesson', schema);