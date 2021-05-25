const { Schema, model } = require('mongoose');

const schema = new Schema({
    type: {
        type: String,
        enum: ['Դասախոսություն', 'Գործնական', 'Լաբորատոր', 'Միջանկյալ', 'Ստուգարք', 'Քննություն1', 'Քննություն2'],
        default: 'Դասախոսություն',
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports = model('Lesson', schema);