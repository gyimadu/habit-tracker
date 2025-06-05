'use client';

import React from 'react';
import MobileLayout from '@/components/MobileLayout';

const MobileWorkouts = () => {
  const workouts = [
    {
      name: 'Full Body Strength',
      duration: '45 min',
      difficulty: 'Intermediate',
      exercises: 8
    },
    {
      name: 'Upper Body Focus',
      duration: '30 min',
      difficulty: 'Beginner',
      exercises: 6
    },
    {
      name: 'Lower Body Power',
      duration: '40 min',
      difficulty: 'Advanced',
      exercises: 7
    }
  ];

  return (
    <MobileLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Workouts</h1>
        <div className="space-y-4">
          {workouts.map((workout, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-2">{workout.name}</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{workout.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty</span>
                  <span>{workout.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exercises</span>
                  <span>{workout.exercises}</span>
                </div>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-medium">
                Start Workout
              </button>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileWorkouts; 