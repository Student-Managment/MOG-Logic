const { Lecturer, Subject } = require('../models');

exports.getLecturers = async (req, res) => {
    const lecturers = await Lecturer.find().lean();
    res.render('lecturers', { lecturers });
}

exports.createLecturerPage = async (req, res) => {
    const subjects = await Subject.find().lean();
    res.render('create-lecturer', { subjects });
}

exports.getLecturerById = async (req, res) => {
    const lecturer = await Lecturer.findById(req.params.id).lean();
    const subjects = await Subject.find().lean();
    res.render('update-lecturer', { lecturer, subjects });
}

exports.createLecturer = async (req, res) => {
    const lecturer = new Lecturer({
        fullName: req.body.fullName
    })
    await lecturer.save();
    res.redirect('/lecturers')
}

exports.updateLecturerById = async (req, res) => {
    const updated = {
        fullName: req.body.fullName
    };
    try {
        const lecturer = await Lecturer.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect('/lecturers');
    } catch(e) {
        console.log(e);
    }
}

exports.deleteLecturerById = async (req, res) => {
    try {
        await Lecturer.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/lecturers');
    } catch(e) {
        console.log(e);
    }
}
