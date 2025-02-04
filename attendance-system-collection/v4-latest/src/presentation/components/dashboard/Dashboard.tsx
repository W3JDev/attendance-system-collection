import React, { useState, useEffect } from 'react';
import { AnalyticsService, AttendanceAnalytics } from '../../../application/services/AnalyticsService';
import AnalyticsCard from './AnalyticsCard';
import AttendanceChart from './AttendanceChart';
import { AttendanceRecord } from '../../../domain/models/Attendance';

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AttendanceAnalytics | null>(null);
  const analyticsService = new AnalyticsService();

  useEffect(() => {
    const fetchAnalytics = async () => {
      // Mock data for demonstration
      const mockRecords: AttendanceRecord[] = [
        // Add mock records here
      ];

      const data = await analyticsService.getAttendanceAnalytics(mockRecords);
      setAnalytics(data);
    };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Total Attendance Records"
          value={analytics.totalRecords}
        />
        <AnalyticsCard
          title="Present Today"
          value={analytics.presentToday}
        />
        <AnalyticsCard
          title="Average Check-in Time"
          value={analytics.averageCheckInTime}
        />
        <AnalyticsCard
          title="Average Check-out Time"
          value={analytics.averageCheckOutTime}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Issues</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Late Check-ins</span>
              <span className="text-red-600 font-medium">{analytics.lateCheckIns}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Early Check-outs</span>
              <span className="text-red-600 font-medium">{analytics.earlyCheckOuts}</span>
            </div>
          </div>
        </div>

        <AttendanceChart data={analytics.monthlyTrends} />
      </div>
    </div>
  );
};

export default Dashboard;