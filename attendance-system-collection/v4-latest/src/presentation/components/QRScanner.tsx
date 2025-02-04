import React, { useState } from 'react';
import QRCode from 'qrcode.react';

interface QRScannerProps {
  value: string;
  size?: number;
  onScan?: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ value, size = 256, onScan }) => {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <QRCode
          value={value}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
      {onScan && (
        <button
          onClick={() => setIsScanning(!isScanning)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {isScanning ? 'Stop Scanning' : 'Start Scanning'}
        </button>
      )}
    </div>
  );
};

export default QRScanner;