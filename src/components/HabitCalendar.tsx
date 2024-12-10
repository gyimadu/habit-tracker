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
  const currentDate = new Date();

  const isFutureDate = (date: Date) => {
    return date > currentDate;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return formatDate(date, 'yyyy-MM-dd') === formatDate(today, 'yyyy-MM-dd');
  };

  const toggleDayCompletion = (date: Date) => {
    if (!isToday(date)) return;
    
    const dateString = formatDate(date, 'yyyy-MM-dd');
    setCompletedDays(prev => {
      const updated = {
        ...prev,
        [dateString]: !prev[dateString],
      };
      return updated;
    });
  };

  const monthlyDays = Array.from({ length: 12 }, (_, monthIndex) => 
    getMonthDays(currentYear, monthIndex)
  );

  // Calculate completion statistics
  //const totalDays = Object.keys(completedDays).length;
  //const completedDaysCount = Object.values(completedDays).filter(Boolean).length;
  //this goes into return
//{completedDaysCount}/{totalDays} days

  const calculateStreak = (completedDays: { [date: string]: boolean }) => {
    const completedDates = Object.keys(completedDays)
      .filter(date => completedDays[date])
      .sort();
  
    let streak = 0;
    let previousDate: string | null = null;
  
    for (const date of completedDates.reverse()) {
      if (!previousDate) {
        streak = 1;
      } else {
        const prevDate = new Date(previousDate);
        prevDate.setDate(prevDate.getDate() - 1);
        if (formatDate(prevDate, 'yyyy-MM-dd') === date) {
          streak++;
        } else {
          break;
        }
      }
      previousDate = date;
    }
  
    return streak;
  };

  const streak = calculateStreak(completedDays);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black">
            {habitTitle || 'Habit'}
          </h3>
          <span className="text-sm text-gray-600">
            <span className="ml-4">Streak: {streak} days</span>
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
                {monthDays.map((day) => {
                  if (isFutureDate(day)) {
                    return null; // Skip rendering future dates
                  }

                  return (
                    <button
                      key={formatDate(day, 'yyyy-MM-dd')}
                      onClick={() => isToday(day) && toggleDayCompletion(day)}
                      disabled={!isToday(day)}
                      className={`
                        w-8 h-8 rounded 
                        ${completedDays[formatDate(day, 'yyyy-MM-dd')] 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-700'}
                        ${!isToday(day) ? 'opacity-50 cursor-text' : 'hover:opacity-80'}
                        transition-all text-xs flex items-center justify-center
                      `}
                    >
                      {formatDate(day, 'd')}
                  </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitCalendar;