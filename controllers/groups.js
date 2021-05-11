const { buildQuery } = require('../utils/util');
const { Group } = require('../models')

exports.getGroups = async (req, res) => {
    // const groups = await Group.find().lean();

    let queryObject = buildQuery(req.query);

    const groups = await Group
                            .find(queryObject)
                            .populate({ path: 'students_count' })
                            .populate({ path: 'students' })
                            .populate({ path: 'lecturer' })
                            .lean();
    const count = await Group.countDocuments(queryObject);

    res.render('groups', { groups, count });
}

exports.createGroupPage = (req, res) => {
    res.render('create-group');
}

exports.getGroupById = async (req, res) => {
    const group = await Group.findById(req.params.id).lean();
    res.render('update-group', { group });
}

exports.createGroup = async (req, res) => {
    const group = new Group({
        name: req.body.name,
        course: req.body.course
    })
    await group.save();
    res.redirect('/groups');
}

exports.updateGroupById = async (req, res) => {
    const updated = {
        name: req.body.name,
        course: req.body.course
    };
    try {
        const group = await Group.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        return res.status(200).redirect('/groups');
    } catch(e) {
        console.log(e);
    }
}

exports.deleteGroupById = async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id);
        return res.status(200).redirect('/groups');
    } catch(e) {
        console.log(e);
    }
}