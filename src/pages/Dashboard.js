import React from 'react';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import TodayClasses from '../components/dashboard/TodayClasses';

const Dashboard = () => {
  return (
    <div className="bg-dashboard">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        대시보드
      </h1>
      <div className="space-y-8">
        <DashboardOverview />
        <div className="grid grid-cols-1 gap-8">
          <TodayClasses />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;