'use client';

import React from 'react';
import MobileLayout from '@/components/MobileLayout';

const MobileHome = () => {
  return (
    <MobileLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Grit</h1>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Today&apos;s Workout</h2>
            <p className="text-gray-600">No workout scheduled for today</p>
            <button className="mt-2 text-blue-600 font-medium">Schedule Workout</button>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Progress Overview</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Workouts Completed</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span>Current Streak</span>
                <span className="font-medium">0 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileHome; 