import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    pin: '',
    cardId: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Employee added successfully!');
        setFormData({
          name: '',
          email: '',
          department: '',
          pin: '',
          cardId: ''
        });
      } else {
        throw new Error('Failed to add employee');
      }
    } catch (error) {
      alert('Error adding employee: ' + error.message);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Employee</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <Input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder="IT"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PIN (4 digits)
            </label>
            <Input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              required
              pattern="\d{4}"
              maxLength="4"
              placeholder="1234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card ID
            </label>
            <Input
              type="text"
              name="cardId"
              value={formData.cardId}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>

          <Button type="submit" className="w-full">
            Add Employee
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEmployee;
