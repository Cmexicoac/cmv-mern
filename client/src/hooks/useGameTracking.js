import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const SOCKET_URL = 'http://localhost:6001';
const HEARTBEAT_INTERVAL = 30000; // Send heartbeat every 30 seconds

export const useGameTracking = (gameName) => {
  const socketRef = useRef(null);
  const sessionIdRef = useRef(null);
  const heartbeatRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [score, setScore] = useState(0);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const gameNameRef = useRef(gameName);
  const autoStartRef = useRef(false);

  // Update game name ref when it changes
  useEffect(() => {
    gameNameRef.current = gameName;
  }, [gameName]);

  // Initialize socket connection
  useEffect(() => {
    const studentId = Cookies.get('id');
    const userRole = Cookies.get('rol');

    // Only track for students
    if (userRole !== 'alumno' || !studentId) {
      console.log('Game tracking: Not a student, skipping tracking');
      return;
    }

    console.log('Game tracking: Initializing socket connection...');
    
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current.on('connect', () => {
      console.log('Game tracking: Connected to server');
      setIsConnected(true);
      
      // Auto-start game session when connected
      if (autoStartRef.current && socketRef.current) {
        console.log('Game tracking: Auto-starting game session...');
        socketRef.current.emit('startGame', {
          studentId: Cookies.get('id'),
          gameName: gameNameRef.current,
        });
      }
    });

    socketRef.current.on('disconnect', () => {
      console.log('Game tracking: Disconnected from server');
      setIsConnected(false);
    });

    socketRef.current.on('gameStarted', (data) => {
      console.log('Game tracking: Session started:', data.sessionId);
      sessionIdRef.current = data.sessionId;
      setSessionStarted(true);
      startTimeRef.current = Date.now();

      // Start elapsed time counter
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setElapsedTime(elapsed);
      }, 1000);

      // Start heartbeat
      heartbeatRef.current = setInterval(() => {
        if (socketRef.current && sessionIdRef.current) {
          socketRef.current.emit('updateGame', {
            sessionId: sessionIdRef.current,
            score: score,
          });
        }
      }, HEARTBEAT_INTERVAL);
    });

    socketRef.current.on('gameEnded', (data) => {
      console.log('Game tracking: Session ended:', data);
      setSessionStarted(false);
    });

    socketRef.current.on('error', (error) => {
      console.error('Game tracking error:', error);
    });

    return () => {
      console.log('Game tracking: Cleaning up...');
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (socketRef.current) {
        // End game session before disconnecting
        if (sessionIdRef.current) {
          socketRef.current.emit('endGame', {
            sessionId: sessionIdRef.current,
            score: score,
          });
        }
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Start game session
  const startGame = useCallback(() => {
    const studentId = Cookies.get('id');
    const userRole = Cookies.get('rol');

    if (userRole !== 'alumno' || !studentId) {
      console.log('Game tracking: Only available for students');
      return;
    }

    autoStartRef.current = true;

    if (socketRef.current && isConnected) {
      console.log('Game tracking: Starting game session for', gameName);
      socketRef.current.emit('startGame', {
        studentId,
        gameName,
      });
    } else {
      console.log('Game tracking: Socket not connected yet, will auto-start when connected');
    }
  }, [gameName, isConnected]);

  // End game session
  const endGame = useCallback((finalScore = null) => {
    console.log('Game tracking: Ending game session...');
    autoStartRef.current = false;
    
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (socketRef.current && sessionIdRef.current) {
      socketRef.current.emit('endGame', {
        sessionId: sessionIdRef.current,
        score: finalScore !== null ? finalScore : score,
      });
      sessionIdRef.current = null;
      setSessionStarted(false);
    }
  }, [score]);

  // Update score
  const updateScore = useCallback((newScore) => {
    setScore(newScore);
    
    // Send immediate update
    if (socketRef.current && sessionIdRef.current) {
      socketRef.current.emit('updateGame', {
        sessionId: sessionIdRef.current,
        score: newScore,
      });
    }
  }, []);

  // Format elapsed time as MM:SS
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    isConnected,
    sessionStarted,
    elapsedTime,
    formattedTime: formatTime(elapsedTime),
    score,
    startGame,
    endGame,
    updateScore,
  };
};

export default useGameTracking;
