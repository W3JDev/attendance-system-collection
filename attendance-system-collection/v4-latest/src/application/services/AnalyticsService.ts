import { AttendanceRecord } from '../../domain/models/Attendance';

export interface AttendanceAnalytics {
  totalRecords: number;
  averageCheckInTime: string;
  averageCheckOutTime: string;
  presentToday: number;
  lateCheckIns: number;
  earlyCheckOuts: number;
  monthlyTrends: Array<{
    date: string;
    attendance: number;
  }>;
}

export class AnalyticsService {
  calculateAverageTime(records: AttendanceRecord[], type: 'CHECK_IN' | 'CHECK_OUT'): string {
    const relevantRecords = records.filter(record => record.type === type);
    if (relevantRecords.length === 0) return '00:00';

    const totalMinutes = relevantRecords.reduce((sum, record) => {
      const time = new Date(record.timestamp);
      return sum + time.getHours() * 60 + time.getMinutes();
    }, 0);

    const averageMinutes = Math.floor(totalMinutes / relevantRecords.length);
    const hours = Math.floor(averageMinutes / 60);
    const minutes = averageMinutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  async getAttendanceAnalytics(records: AttendanceRecord[]): Promise<AttendanceAnalytics> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecords = records.filter(record => {
      const recordDate = new Date(record.timestamp);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === today.getTime();
    });

    const monthlyData = this.calculateMonthlyTrends(records);

    return {
      totalRecords: records.length,
      averageCheckInTime: this.calculateAverageTime(records, 'CHECK_IN'),
      averageCheckOutTime: this.calculateAverageTime(records, 'CHECK_OUT'),
      presentToday: todayRecords.length,
      lateCheckIns: this.calculateLateCheckIns(records),
      earlyCheckOuts: this.calculateEarlyCheckOuts(records),
      monthlyTrends: monthlyData
    };
  }

  private calculateLateCheckIns(records: AttendanceRecord[]): number {
    const expectedCheckInTime = 9 * 60; // 9:00 AM in minutes
    return records.filter(record => {
      if (record.type !== 'CHECK_IN') return false;
      const time = new Date(record.timestamp);
      const minutesSinceMidnight = time.getHours() * 60 + time.getMinutes();
      return minutesSinceMidnight > expectedCheckInTime;
    }).length;
  }

  private calculateEarlyCheckOuts(records: AttendanceRecord[]): number {
    const expectedCheckOutTime = 17 * 60; // 5:00 PM in minutes
    return records.filter(record => {
      if (record.type !== 'CHECK_OUT') return false;
      const time = new Date(record.timestamp);
      const minutesSinceMidnight = time.getHours() * 60 + time.getMinutes();
      return minutesSinceMidnight < expectedCheckOutTime;
    }).length;
  }

  private calculateMonthlyTrends(records: AttendanceRecord[]): Array<{ date: string; attendance: number }> {
    const monthlyData = new Map<string, number>();
    
    records.forEach(record => {
      const date = new Date(record.timestamp);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      monthlyData.set(monthYear, (monthlyData.get(monthYear) || 0) + 1);
    });

    return Array.from(monthlyData.entries())
      .map(([date, attendance]) => ({ date, attendance }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}