const Teacher = require("../models/teacher.js");

const createTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  try {
    console.log("Intentando registrar un maestro");
    await teacher.save();
    res.status(201).send({ teacher });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({}).populate("groups", "name _id");
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
};

// function to find teachers and their groups TODO

module.exports = {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
};
