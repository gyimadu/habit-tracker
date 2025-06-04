'use client';

import React, { useState, useEffect } from 'react';
import HabitCalendar from '@/components/HabitCalendar';
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Image from 'next/image'

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastLoggedDate: string | null;
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
        name: newHabitName.trim(),
        streak: 0,
        lastLoggedDate: null,
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

      <main className="container mx-auto p-5 max-w-6xl">
          
        <div className="flex flex-col md:flex-row items-center justify-center h-screen mt-0 pt-5 md:pt-0 md:mt-0 mb-10 text-center">
          <div className="text-center md:text-left w-full md:w-6/12 mb-10">
            <h1 className="text-5xl md:text-5xl font-semibold mb-6 md:leading-normal px-4 md:px-0">Track<br/> better with Zuno</h1>
            <p className="text-lg md:text-lg mb-4">Track. Achieve. Repeat</p>
            
            {!isAddingHabit ? (
              <button 
                onClick={() => setIsAddingHabit(true)}
                className="bg-blue-600 border-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-800 transition"
              >
                + Get Started
              </button>
            ) : (
              <div className="flex flex-col md:flex-row md:items-start items-stretch">
                <input 
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="Let's name your habit"
                  className="w-auto px-3 py-3 mb-2 border rounded-lg text-white bg-black focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                />
                <button 
                  onClick={addHabit}
                  className="bg-gray-500 w-auto mb-1 text-white ml-1 px-4 py-3 rounded-lg hover:bg-blue-800"
                >
                  Create!
                </button>
                <button 
                  onClick={() => setIsAddingHabit(false)}
                  className="bg-gray-300 w-auto text-black ml-1 px-4 py-3 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="md:flex w-full md:w-6/12 md:justify-end">
            <Image
              src="/healthy-habit.png"
              alt="habits"
              width={600}
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

        {/* Features Section */}
        <div className="mt-32 mb-20 px-4 md:px-0">
          <h2 className="text-4xl md:text-5xl font-bold text-left md:text-center mb-16">
            Turn intentions into action—without burnout
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-blue-700">Smart Habit Suggestions</h3>
              <p className="text-gray-800 text-lg">
                Get personalized habit ideas based on your goals and behavior patterns.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-purple-700">AI-Powered Reminders</h3>
              <p className="text-gray-800 text-lg">
                Receive intelligent nudges at the right time to keep you on track.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-black">Streak Tracking</h3>
              <p className="text-gray-800 text-lg">
                Track your consistency with visual streaks and stay motivated with rewards. View detailed insights that show how your habits evolve over time.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-amber-600">Mood Logging</h3>
              <p className="text-gray-800 text-lg">
                Log your mood and energy levels to discover what drives your habits.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    
  );
}