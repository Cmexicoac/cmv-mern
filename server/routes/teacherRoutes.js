const express = require('express');
const router = express.Router();
const teacherController = require('../api/teacherApi.js');

router.post('/api/createTeacher', teacherController.createTeacher);
router.get('/api/getTeacher', teacherController.getTeachers);
router.get('/:id', teacherController.getTeacher);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;