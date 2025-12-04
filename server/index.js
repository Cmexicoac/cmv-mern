const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { fileURLToPath } = require('url');
const userRoutes = require('./routes/userRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const groupRoutes = require('./routes/groupRoutes');
const gameSessionRoutes = require('./routes/gameSessionRoutes');
const GameSession = require('./models/GameSession');

// Configurations 

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
//store images locally for now... change to s3 later
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// JWT and Passport setup
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;


// include user routes
app.use(userRoutes);
app.use(alumnoRoutes);
app.use(teacherRoutes);
app.use(groupRoutes);
app.use(gameSessionRoutes);

// Socket.io connection handling for game sessions
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Start game session
  socket.on('startGame', async (data) => {
    try {
      const { studentId, gameName } = data;
      
      // End any existing active sessions for this student
      await GameSession.updateMany(
        { studentId, isActive: true },
        { 
          isActive: false, 
          endTime: new Date(),
          $set: { duration: { $subtract: [new Date(), '$startTime'] } }
        }
      );
      
      // Create new session
      const session = new GameSession({
        studentId,
        gameName,
        startTime: new Date(),
        isActive: true
      });
      
      await session.save();
      socket.gameSessionId = session._id;
      socket.studentId = studentId;
      
      socket.emit('gameStarted', { sessionId: session._id });
      console.log(`Game session started: ${gameName} for student ${studentId}`);
    } catch (error) {
      console.error('Error starting game session:', error);
      socket.emit('error', { message: 'Failed to start game session' });
    }
  });
  
  // Update game session (heartbeat to track active time)
  socket.on('updateGame', async (data) => {
    try {
      const { sessionId, score } = data;
      
      if (sessionId) {
        const session = await GameSession.findById(sessionId);
        if (session && session.isActive) {
          const duration = Math.floor((new Date() - session.startTime) / 1000);
          await GameSession.findByIdAndUpdate(sessionId, { 
            duration,
            score: score || session.score
          });
        }
      }
    } catch (error) {
      console.error('Error updating game session:', error);
    }
  });
  
  // End game session
  socket.on('endGame', async (data) => {
    try {
      const { sessionId, score } = data;
      
      if (sessionId) {
        const session = await GameSession.findById(sessionId);
        if (session) {
          const endTime = new Date();
          const duration = Math.floor((endTime - session.startTime) / 1000);
          
          await GameSession.findByIdAndUpdate(sessionId, {
            endTime,
            duration,
            isActive: false,
            score: score || session.score
          });
          
          console.log(`Game session ended: ${session.gameName} - Duration: ${duration}s`);
          socket.emit('gameEnded', { duration, score });
        }
      }
    } catch (error) {
      console.error('Error ending game session:', error);
      socket.emit('error', { message: 'Failed to end game session' });
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', async () => {
    console.log('User disconnected:', socket.id);
    
    // End any active session for this socket
    if (socket.gameSessionId) {
      try {
        const session = await GameSession.findById(socket.gameSessionId);
        if (session && session.isActive) {
          const endTime = new Date();
          const duration = Math.floor((endTime - session.startTime) / 1000);
          
          await GameSession.findByIdAndUpdate(socket.gameSessionId, {
            endTime,
            duration,
            isActive: false
          });
          
          console.log(`Game session ended on disconnect: Duration: ${duration}s`);
        }
      } catch (error) {
        console.error('Error ending session on disconnect:', error);
      }
    }
  });
});


// File Storage config

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

// Mongoose setup 
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(
    'Error connecting to MongoDB: ', error.message
));



app.get('/', (req, res) => {
    res.send('Hola, mundo!');
});

