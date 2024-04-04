const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avgGrade: {
    type: String,
    default: 'A',
  },
  studentsPlaying: {
    type: Number,
    default: 10,
  },
  aprobados: {
    type: Number,
    default: 20,
  },
  reprobados: {
    type: Number,
    default: 10,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
});

const group = mongoose.models.group || mongoose.model("group", groupSchema);

module.exports = group;
