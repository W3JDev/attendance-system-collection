import React, { useState } from 'react';
import { AttendanceType, VerificationMethod } from '../../domain/models/Attendance';
import FaceRecognition from './FaceRecognition';
import QRScanner from './QRScanner';

interface AttendanceFormProps {
  onSubmit: (data: any) => void;
  defaultMethod?: VerificationMethod;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ 
  onSubmit, 
  defaultMethod = VerificationMethod.FACIAL_RECOGNITION 
}) => {
  const [method, setMethod] = useState(defaultMethod);
  const [type, setType] = useState<AttendanceType>(AttendanceType.CHECK_IN);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Implementation for form submission
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Record Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setType(AttendanceType.CHECK_IN)}
              className={\`px-4 py-2 rounded-lg \${
                type === AttendanceType.CHECK_IN 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200'
              }\`}
            >
              Check In
            </button>
            <button
              type="button"
              onClick={() => setType(AttendanceType.CHECK_OUT)}
              className={\`px-4 py-2 rounded-lg \${
                type === AttendanceType.CHECK_OUT 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200'
              }\`}
            >
              Check Out
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Verification Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as VerificationMethod)}
              className="w-full p-2 border rounded-lg"
            >
              <option value={VerificationMethod.FACIAL_RECOGNITION}>
                Face Recognition
              </option>
              <option value={VerificationMethod.QR_CODE}>
                QR Code
              </option>
              <option value={VerificationMethod.MANUAL}>
                Manual
              </option>
            </select>
          </div>
          
          {method === VerificationMethod.FACIAL_RECOGNITION && (
            <FaceRecognition
              onFaceDetected={(faceData) => console.log('Face detected:', faceData)}
              onError={(error) => console.error('Face detection error:', error)}
            />
          )}
          
          {method === VerificationMethod.QR_CODE && (
            <QRScanner
              value="example-qr-code"
              onScan={(data) => console.log('QR scanned:', data)}
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;