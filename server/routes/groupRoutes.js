const express = require('express');
const router = express.Router();
const Group = require('../models/group.js');
const Teacher = require('../models/teacher.js');

router.post('/createGroup', async (req, res) => {
    const { groupName, teacherId } = req.body;

    // Create a new group
    const group = new Group({ name: groupName, teacher: teacherId });

    try {
        // Save the group
        const savedGroup = await group.save();

        // Find the teacher and update their groups array
        const teacher = await Teacher.findById(teacherId);
        teacher.groups.push(savedGroup._id);
        await teacher.save();

        res.status(200).json(savedGroup);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/getAllGroups', async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// function to find a group by its id
const findGroupById = (teacher, groupId) => {
    return teacher.groups.find(group => group._id === groupId);
};

module.exports = router;