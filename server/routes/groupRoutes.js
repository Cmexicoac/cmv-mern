const express = require("express");
const router = express.Router();
const Group = require("../models/Group.js");
const Teacher = require("../models/teacher.js");

router.post("/api/createGroup", async (req, res) => {
  const { groupName, teacherId } = req.body;
  const group = new Group({ name: groupName, teacher: teacherId }); // Use new Group(...) instead of new this.getroup(...)
  // ...

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

router.get("/api/getAllGroups", async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// find a group by teacher id
router.get("/api/getGroupsByTeacherId/:teacherId", async (req, res) => {
  try {
    const groups = await Group.find({ teacher: req.params.teacherId });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

//delete group by id
router.delete("/api/deleteGroup/:id", async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).send();
    }
    res.send(group);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
