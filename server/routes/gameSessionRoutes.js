const express = require('express');
const router = express.Router();
const GameSession = require('../models/GameSession');

// Get all game sessions for a student
router.get('/api/game-sessions/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const sessions = await GameSession.find({ studentId })
            .sort({ startTime: -1 })
            .limit(50);
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get game statistics for a student
router.get('/api/game-stats/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        
        const stats = await GameSession.aggregate([
            { $match: { studentId: require('mongoose').Types.ObjectId(studentId) } },
            {
                $group: {
                    _id: '$gameName',
                    totalTime: { $sum: '$duration' },
                    totalSessions: { $sum: 1 },
                    avgDuration: { $avg: '$duration' },
                    highestScore: { $max: '$score' },
                    lastPlayed: { $max: '$startTime' }
                }
            }
        ]);
        
        // Calculate total time across all games
        const totalStats = await GameSession.aggregate([
            { $match: { studentId: require('mongoose').Types.ObjectId(studentId) } },
            {
                $group: {
                    _id: null,
                    totalTime: { $sum: '$duration' },
                    totalSessions: { $sum: 1 }
                }
            }
        ]);
        
        res.json({
            byGame: stats,
            total: totalStats[0] || { totalTime: 0, totalSessions: 0 }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all students' game statistics (for teachers)
router.get('/api/game-stats', async (req, res) => {
    try {
        const stats = await GameSession.aggregate([
            {
                $group: {
                    _id: {
                        studentId: '$studentId',
                        gameName: '$gameName'
                    },
                    totalTime: { $sum: '$duration' },
                    totalSessions: { $sum: 1 },
                    avgDuration: { $avg: '$duration' },
                    highestScore: { $max: '$score' },
                    lastPlayed: { $max: '$startTime' }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id.studentId',
                    foreignField: '_id',
                    as: 'student'
                }
            },
            {
                $unwind: '$student'
            },
            {
                $project: {
                    studentId: '$_id.studentId',
                    gameName: '$_id.gameName',
                    studentName: '$student.nombre',
                    studentEmail: '$student.email',
                    matricula: '$student.matricula',
                    totalTime: 1,
                    totalSessions: 1,
                    avgDuration: 1,
                    highestScore: 1,
                    lastPlayed: 1
                }
            },
            {
                $sort: { totalTime: -1 }
            }
        ]);
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get recent game sessions (for dashboard)
router.get('/api/game-sessions', async (req, res) => {
    try {
        const sessions = await GameSession.find()
            .populate('studentId', 'nombre email matricula')
            .sort({ startTime: -1 })
            .limit(100);
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
