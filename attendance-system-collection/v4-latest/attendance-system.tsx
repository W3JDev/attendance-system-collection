import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera } from 'lucide-react';

const AttendanceSystem = () => {
  const [pin, setPin] = useState('');
  const [mode, setMode] = useState('pin'); // 'pin' or 'camera'
  const [showCamera, setShowCamera] = useState(false);
  
  const handlePinInput = (value) => {
    if (pin.length < 4) {
      setPin(prev => prev + value);
    }
  };

  const handleClear = () => {
    setPin('');
  };

  const handleSubmit = () => {
    // Here you would integrate with your backend
    console.log('Submitting PIN:', pin);
    setPin('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Staff Attendance System
          </CardTitle>
          <div className="text-center text-gray-500">
            {new Date().toLocaleString()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={mode === 'pin' ? 'default' : 'outline'}
                onClick={() => setMode('pin')}
                className="w-full"
              >
                Enter PIN
              </Button>
              <Button
                variant={mode === 'camera' ? 'default' : 'outline'}
                onClick={() => setMode('camera')}
                className="w-full"
              >
                Scan Card
              </Button>
            </div>

            {mode === 'pin' ? (
              <div>
                <div className="mb-4">
                  <Input
                    type="password"
                    value={pin}
                    readOnly
                    className="text-center text-2xl"
                    placeholder="Enter PIN"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <Button
                      key={num}
                      variant="outline"
                      onClick={() => handlePinInput(num)}
                      className="h-12 text-lg"
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="h-12 text-lg"
                  >
                    Clear
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePinInput(0)}
                    className="h-12 text-lg"
                  >
                    0
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSubmit}
                    className="h-12 text-lg"
                  >
                    Enter
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <Camera className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <div className="text-sm text-gray-500">
                  Place your ID card in front of the camera
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceSystem;
