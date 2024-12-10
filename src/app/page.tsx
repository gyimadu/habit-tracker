'use client';

import React, { useState, useEffect } from 'react';
import HabitCalendar from '@/components/HabitCalendar';
import NavBar from '@/components/NavBar'
import Image from 'next/image'

interface Habit {
  id: string;
  name: string;
}

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits, isClient]);

  // Add a new habit
  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit = {
        id: `habit-${Date.now()}`, 
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

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <NavBar />

      <main className="container mx-auto p-5 max-w-7xl">
          
        <div className="flex flex-col md:flex-row items-center justify-center h-screen mb-10 text-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Build better habits, everyday!</h1>
            <p className="text-lg md:text-xl mb-4">Your go-to tool for building and maintaining great habits.</p>
            
            {!isAddingHabit ? (
              <button 
                onClick={() => setIsAddingHabit(true)}
                className="bg-blue-500 border-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-800 transition"
              >
                + Create Habit
              </button>
            ) : (
              <div className="flex flex-col md:flex-row items-center">
                <input 
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="Let's name your habit"
                  className="w-150 px-3 py-2 border rounded-lg text-white bg-black focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                />
                <button 
                  onClick={addHabit}
                  className="bg-gray-500 text-white ml-4 px-4 py-1.5 rounded-lg hover:bg-blue-800"
                >
                  Create!
                </button>
                <button 
                  onClick={() => setIsAddingHabit(false)}
                  className="bg-gray-300 text-black ml-1 px-4 py-1.5 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div>
            <Image
              src="/healthy-habit.png"
              alt="habits"
              width={500}
              height={100}
            />
          </div>
        </div>

        {/* Habits List */}
        <div className="space-y-5">
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
    </div>
    
  );
}