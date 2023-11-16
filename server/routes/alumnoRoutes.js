const express = require('express');
const router = express.Router();
const alumnoController = require('../api/alumnoApi.js')

router.post('/api/registerAlumno', alumnoController.registerAlumno);
router.delete('/api/deleteAlumnos', alumnoController.deleteAllData);
router.get('/api/getContraGrado', alumnoController.getAlumnoContra);
router.get('/api/getAlumnos', alumnoController.getAlumnos);

module.exports = router;