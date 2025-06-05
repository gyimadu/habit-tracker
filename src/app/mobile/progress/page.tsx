'use client';

import React from 'react';
import MobileLayout from '@/components/MobileLayout';

const MobileProgress = () => {
  const stats = [
    { label: 'Total Workouts', value: '0' },
    { label: 'Current Streak', value: '0 days' },
    { label: 'Calories Burned', value: '0' },
    { label: 'Workout Time', value: '0 hrs' }
  ];

  return (
    <MobileLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Progress</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="text-center text-gray-600 py-8">
            No recent activity to show
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileProgress; 