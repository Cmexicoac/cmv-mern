const mongoose = require('mongoose');
const User = require('./User.js');

const TeacherSchema = User.discriminator('Teacher', new mongoose.Schema({
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }]
}));

module.exports = TeacherSchema;
