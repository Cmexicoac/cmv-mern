const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
    _id: {  // Usar la matricula como el identificador
        type: String,
        required: true
    },
    numeroDeLista: {
        type: Number,
        required: true
    },
    grado: {
        type: String,
        required: true
    }
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;