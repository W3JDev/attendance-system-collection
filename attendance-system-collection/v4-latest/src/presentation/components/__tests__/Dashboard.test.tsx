import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../dashboard/Dashboard';
import { AuthProvider } from '../../../application/contexts/AuthContext';

jest.mock('../../../application/services/AnalyticsService', () => ({
  AnalyticsService: jest.fn().mockImplementation(() => ({
    getAttendanceAnalytics: jest.fn().mockResolvedValue({
      totalRecords: 100,
      averageCheckInTime: '09:00',
      averageCheckOutTime: '17:00',
      presentToday: 45,
      lateCheckIns: 5,
      earlyCheckOuts: 3,
      monthlyTrends: [
        { date: '2024-01', attendance: 95 },
        { date: '2024-02', attendance: 98 }
      ]
    })
  }))
}));

const renderDashboard = () => {
  render(
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
};

describe('Dashboard', () => {
  it('renders dashboard analytics cards', async () => {
    renderDashboard();
    
    expect(await screen.findByText('Total Attendance Records')).toBeInTheDocument();
    expect(await screen.findByText('Present Today')).toBeInTheDocument();
    expect(await screen.findByText('Average Check-in Time')).toBeInTheDocument();
    expect(await screen.findByText('Average Check-out Time')).toBeInTheDocument();
  });

  it('displays attendance statistics', async () => {
    renderDashboard();
    
    expect(await screen.findByText('100')).toBeInTheDocument();
    expect(await screen.findByText('45')).toBeInTheDocument();
    expect(await screen.findByText('09:00')).toBeInTheDocument();
    expect(await screen.findByText('17:00')).toBeInTheDocument();
  });

  it('shows attendance issues section', async () => {
    renderDashboard();
    
    expect(await screen.findByText('Attendance Issues')).toBeInTheDocument();
    expect(await screen.findByText('Late Check-ins')).toBeInTheDocument();
    expect(await screen.findByText('Early Check-outs')).toBeInTheDocument();
  });
});