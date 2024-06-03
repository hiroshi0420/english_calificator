import React, { useState, useEffect, useRef } from 'react';
export const SpeakingTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const [question, setQuestion] = useState('What is your opinion on climate change?');
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(stream);
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    };

    getMedia();
  }, []);

  const handleStartRecording = () => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setIsRecording(false);
      };

      setTimeout(() => {
        mediaRecorder.stop();
      }, 60000); // Stop recording after 1 minute
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div>
      <h1>Speaking Test</h1>
      <p>{question}</p>
      <button onClick={handleStartRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {audioURL && (
        <div>
          <h2>Recorded Audio</h2>
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  );
};
