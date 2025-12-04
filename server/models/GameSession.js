const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    gameName: {
        type: String,
        enum: ['colon', 'conquista', 'cronologia', 'preguntas'],
        required: true
    },
    
    startTime: {
        type: Date,
        required: true
    },
    
    endTime: {
        type: Date
    },
    
    duration: {
        type: Number, // Duration in seconds
        default: 0
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    
    score: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
gameSessionSchema.index({ odysudentId: 1, gameName: 1 });
gameSessionSchema.index({ startTime: -1 });

const GameSession = mongoose.model('GameSession', gameSessionSchema);

module.exports = GameSession;
