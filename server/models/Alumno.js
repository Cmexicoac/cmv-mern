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
  },
  name: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  gameScore: {
    type: Number,
    required: false
  },
  timePlayed: {
    type: Number,
    required: false
  },
  activeInGame: {
    type: Boolean,
    required: false
  },
  gamePlaying: {
    type: String,
    required: false
  },
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;