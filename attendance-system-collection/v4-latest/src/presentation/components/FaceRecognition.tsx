import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

interface FaceRecognitionProps {
  onFaceDetected: (faceData: string) => void;
  onError: (error: string) => void;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ onFaceDetected, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        setIsInitialized(true);
      } catch (error) {
        onError('Failed to load face recognition models');
      }
    };

    loadModels();
  }, [onError]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <video
        ref={videoRef}
        className="w-full rounded-lg shadow-lg"
        autoPlay
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default FaceRecognition;