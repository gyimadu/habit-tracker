'use client';

import React from 'react';
import { formatDate, getMonthDays } from '@/utils/dateHelpers';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface HabitCalendarProps {
  habitName: string;
  habitTitle?: string;
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({ habitName, habitTitle }) => {
  const [completedDays, setCompletedDays] = useLocalStorage<{ [date: string]: boolean }>(
    `habit-${habitName}`, 
    {}
  );
  const currentYear = new Date().getFullYear();

  const toggleDayCompletion = (date: Date) => {
    const dateString = formatDate(date, 'yyyy-MM-dd');
    setCompletedDays(prev => ({
      ...prev,
      [dateString]: !prev[dateString]
    }));
  };

  const monthlyDays = Array.from({ length: 12 }, (_, monthIndex) => 
    getMonthDays(currentYear, monthIndex)
  );

  // Calculate completion statistics
  const totalDays = Object.keys(completedDays).length;
  const completedDaysCount = Object.values(completedDays).filter(Boolean).length;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black">
            {habitTitle || 'Habit'}
          </h3>
          <span className="text-sm text-gray-600">
            {completedDaysCount}/{totalDays} days
          </span>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex space-x-4 p-4 min-w-[1200px]">
          {monthlyDays.map((monthDays, monthIndex) => (
            <div 
              key={monthIndex} 
              className="flex flex-col items-center min-w-[240px]"
            >
              <h4 className="text-sm font-medium mb-2 text-gray-600">
                {formatDate(monthDays[0], 'MMMM')}
              </h4>
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day) => (
                  <button
                    key={formatDate(day, 'yyyy-MM-dd')}
                    onClick={() => toggleDayCompletion(day)}
                    className={`
                      w-8 h-8 rounded 
                      ${completedDays[formatDate(day, 'yyyy-MM-dd')] 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700'}
                      hover:opacity-80 transition-all
                      text-xs flex items-center justify-center
                    `}
                  >
                    {formatDate(day, 'd')}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitCalendar;