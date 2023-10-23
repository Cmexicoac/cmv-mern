const mongoose = require('mongoose');

// Schema definition

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        enum: ['alumno', 'profesor'],
        required: true
    },

    nombre: {
        type: String,
        required: false
    },

    matricula: {
        type: String,
        required: true,
        unique: true
    },

    grado: {
        type: String,
        required: true
    },

    numeroDeLista: {
        type: Number,
        required: true
    },
    
    foto: {
        type: String
    }
});

//Model creation

const User = mongoose.model('User', userSchema);

module.exports = User;