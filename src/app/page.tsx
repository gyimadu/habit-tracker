'use client';

import React, { useState, useEffect } from 'react';
import HabitCalendar from '@/components/HabitCalendar';

// Define the Habit type
interface Habit {
  id: string;
  name: string;
}

export default function Home() {
  // Use state for habits to avoid hydration issues
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load habits from local storage on client side
  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
    setIsClient(true);
  }, []);

  // Update local storage when habits change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits, isClient]);

  // Add a new habit
  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit = {
        id: `habit-${Date.now()}`, // use a more consistent ID generation
        name: newHabitName.trim()
      };
      setHabits(prevHabits => [...prevHabits, newHabit]);
      setNewHabitName('');
      setIsAddingHabit(false);
    }
  };

  // Remove a habit
  const removeHabit = (id: string) => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
    localStorage.removeItem(`habit-${id}`);
  };

  // Prevent rendering before client-side hydration
  if (!isClient) {
    return null;
  }

  return (
    <main className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Habit Tracker</h1>
      
      {/* New Habit Section */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">New Habit?</h2>
        
        {!isAddingHabit ? (
          <button 
            onClick={() => setIsAddingHabit(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            + Add Habit
          </button>
        ) : (
          <div className="flex space-x-2">
            <input 
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="Enter habit name"
              className="flex-grow px-3 py-2 border rounded text-black bg-white"
              onKeyDown={(e) => e.key === 'Enter' && addHabit()}
            />
            <button 
              onClick={addHabit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button 
              onClick={() => setIsAddingHabit(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Habits List */}
      <div className="space-y-6">
        {habits.map((habit) => (
          <div key={habit.id} className="relative">
            <button 
              onClick={() => removeHabit(habit.id)}
              className="absolute right-0 top-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs z-10"
            >
              ×
            </button>
            <HabitCalendar habitName={habit.id} habitTitle={habit.name} />
          </div>
        ))}
      </div>
    </main>
  );
}