// client/src/components/attendance/CheckInSystem.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera } from 'lucide-react';

const CheckInSystem = () => {
  const [pin, setPin] = useState('');
  const [mode, setMode] = useState('pin');

  const handlePinSubmit = async () => {
    try {
      const response = await fetch('/api/attendance/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pin })
      });
      if (response.ok) {
        alert('Check-in successful!');
        setPin('');
      }
    } catch (error) {
      alert('Check-in failed');
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Attendance Check-In</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => setMode('pin')}
              variant={mode === 'pin' ? 'default' : 'outline'}
            >
              PIN Entry
            </Button>
            <Button
              onClick={() => setMode('card')}
              variant={mode === 'card' ? 'default' : 'outline'}
            >
              Card Scan
            </Button>
          </div>

          {mode === 'pin' ? (
            <div className="space-y-4">
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                placeholder="Enter PIN"
              />
              <Button onClick={handlePinSubmit} className="w-full">
                Check In
              </Button>
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed rounded">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Scan your ID card
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckInSystem;

// client/src/components/attendance/RequestForm.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RequestForm = () => {
  const [request, setRequest] = useState({
    date: '',
    type: 'missing',
    reason: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/attendance/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      if (response.ok) {
        alert('Request submitted successfully');
      }
    } catch (error) {
      alert('Failed to submit request');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Attendance Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="date"
              value={request.date}
              onChange={(e) => setRequest({...request, date: e.target.value})}
            />
          </div>
          <div>
            <Input
              placeholder="Reason"
              value={request.reason}
              onChange={(e) => setRequest({...request, reason: e.target.value})}
            />
          </div>
          <Button type="submit">Submit Request</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestForm;
