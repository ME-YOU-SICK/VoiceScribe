// App.jsx
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isRecording && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  const handleStartRecording = () => {
    SpeechRecognition.startListening();
    setIsRecording(true);

  };

  const handleStopRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
  };

  const handleReset = () => {
    resetTranscript();
    setTimer(0);
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.heading}>VOICESCRIBE</h1>
      <div style={styles.container}>
        <div style={styles.timer}>
          {`Timer: ${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`}
        </div>
        <button onClick={isRecording ? handleStopRecording : handleStartRecording} style={styles.button}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <div style={styles.transcriptionBox}>
          <h2>Transcription:</h2>
          <p>{transcript}</p>
          <button onClick={handleReset} style={styles.copyButton}>Reset</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  timer: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  transcriptionBox: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    width: '80%',
    maxWidth: '500px',
    minHeight: '100px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    position: 'relative',
  },
  copyButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default App;
