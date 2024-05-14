const express = require('express');
const router = express.Router();
const alumnoController = require('../api/alumnoApi.js');
const Group = require("../models/Group.js");
const Alumno = require('../models/Alumno');
const User = require('../models/User.js');
const Teacher = require("../models/teacher.js");


router.post('/api/registerAlumno', alumnoController.registerAlumno);
router.delete('/api/deleteAlumnos', alumnoController.deleteAllData);
router.get('/api/getContraGrado', alumnoController.getAlumnoContra);
router.get('/api/getAlumnos', alumnoController.getAlumnos);
router.post('/api/registerAlumnoByGroupId/:groupId', async (req, res) => {
    const { matricula, numeroDeLista, grado, name, status, gameScore, timePlayed, activeInGame, gamePlaying } = req.body;
    const { groupId } = req.params;
    const alumno = new Alumno({ matricula, numeroDeLista, grado, name, status, gameScore, timePlayed, activeInGame, gamePlaying }); // Create new alumno
  
    try {
      // Find the group
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      // Add the alumno to the group's alumnos array
      group.alumnos.push(alumno._id);
      await group.save();
  
      // Save the alumno
      const savedAlumno = await alumno.save();
  
      res.status(200).json(savedAlumno);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });


router.get("/api/getAlumnosByTeacherId/:teacherId", async (req, res) => {
const { teacherId } = req.params;

try {
    // Find the teacher
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
    return res.status(404).json({ error: 'Teacher not found' });
    }

    // Get the groups of the teacher
    const groups = await Group.find({ _id: { $in: teacher.groups } });

    // Find the alumnos for each group
    const alumnosPromises = groups.map(group => {
    return Alumno.find({ _id: { $in: group.alumnos } });
    });

    const alumnosArrays = await Promise.all(alumnosPromises);

    // Flatten the array of arrays
    const alumnos = [].concat(...alumnosArrays);

    res.status(200).json(alumnos);
} catch (error) {
    res.status(500).json({ error: error.toString() });
}
});

  
module.exports = router;