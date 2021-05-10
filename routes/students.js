const { Router } = require('express')
const Student = require('../models/Student')
const router = Router()

router.get('/', async (req, res) => {
    const students = await Student.find().lean();   // findAll()
    res.render('students', { students });
});

router.get('/create', (req, res) => {
    res.render('create-student');
});                                                // browser-um yerevacox

router.get('/update/:id', async (req, res) => {
    const student = await Student.findById(req.params.id).lean();
    res.render('update-student', { student });
});

router.post('/create', async (req, res) => {
    const student = new Student({
        fullName: req.body.fullName,
        group: req.body.group
    })
    console.log(student);
    await student.save();
    res.redirect('/students')
})                                  // browser-um cherevaox


router.post('/update/:id', async (req, res) => {
    const updated = {
        fullName: req.body.fullName,
        group: req.body.group
    };
    try {
        const student = await Student.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect('/students');
    } catch(e) {
        console.log(e);
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/students');
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;