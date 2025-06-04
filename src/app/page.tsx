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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="space-y-1 py-4 px-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl mb-2 font-bold text-blue-700">Smart Habit Suggestions</h3>
              <p className="text-black text-lg">
                Get personalized habit ideas based on your goals and behavior patterns.
              </p>
            </div>

            <div className="space-y-1 py-4 px-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl mb-2 font-bold text-purple-700">AI-Powered Reminders</h3>
              <p className="text-black text-lg">
                Receive intelligent nudges at the right time to keep you on track.
              </p>
            </div>

            <div className="space-y-1 py-4 px-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl mb-2 font-bold text-black">Streak Tracking</h3>
              <p className="text-black text-lg">
                Track your consistency with visual streaks and stay motivated with rewards.
              </p>
            </div>

            <div className="space-y-1 py-4 px-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl mb-2 font-bold text-amber-600">Mood Logging</h3>
              <p className="text-black text-lg">
                Log your mood and energy levels to discover what drives your habits.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 mb-20 px-4 md:px-0">
          <h2 className="text-4xl md:text-5xl font-bold text-left md:text-center mb-16">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">How does Zuno help me build better habits?</h3>
              <p className="text-black text-lg">
                Zuno combines AI-powered insights with proven habit-forming techniques to help you identify, track, and maintain your habits. We provide personalized suggestions, timely reminders, and visual progress tracking to keep you motivated.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Where is my data stored and is it safe?</h3>
              <p className="text-black text-lg">
                Your data is stored locally on your device by default. For syncing across devices, we use encrypted cloud storage with industry-standard security measures. We never store sensitive personal information, and all data transfers are encrypted using SSL/TLS protocols.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Does Zuno share my data with third parties?</h3>
              <p className="text-black text-lg">
                No, we never share your personal data with third parties. Your habit data is yours alone. We use anonymized, aggregated data only for improving our service and understanding usage patterns. You can read our detailed privacy policy for more information.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Can I customize my habit reminders or schedule?</h3>
              <p className="text-black text-lg">
                Yes! You can set custom reminder times for each habit, choose your preferred notification style, and even set up different schedules for weekdays and weekends. Our smart scheduling system will also learn from your completion patterns to suggest optimal reminder times.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">What happens if I miss a day—does my streak reset?</h3>
              <p className="text-black text-lg">
                We understand that life happens! Your streak won't reset immediately if you miss a day. We offer a 24-hour grace period, and you can also use "streak freezes" to maintain your streak during planned breaks. This helps you stay motivated while being realistic about habit formation.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Is Zuno available on mobile devices?</h3>
              <p className="text-black text-lg">
                Yes! Zuno is fully responsive and works on all devices. We're currently developing native mobile apps for iOS and Android, which will be available soon. The web version is already optimized for mobile use, so you can start tracking your habits right away.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Do I need an internet connection to use Zuno?</h3>
              <p className="text-black text-lg">
                You can use Zuno offline for basic habit tracking. Your data will sync automatically when you're back online. However, some features like AI-powered suggestions and cross-device syncing require an internet connection.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Can I back up or export my habit data?</h3>
              <p className="text-black text-lg">
                Yes, you can export your habit data at any time in CSV or JSON format. We also provide automatic backups of your data. Premium users will get access to more detailed analytics and export options in the future.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Will Zuno always be free?</h3>
              <p className="text-black text-lg">
                Yes, the core habit tracking features will always be free. We're committed to keeping the essential functionality accessible to everyone. Future premium features will be optional and focused on advanced analytics and customization.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">What's included in the free vs. premium plan?</h3>
              <p className="text-black text-lg">
                The free plan includes unlimited habit tracking, basic streak tracking, and essential reminders. The upcoming premium plan will add advanced analytics, custom habit templates, integration with health apps, and priority support. All core features will remain free.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Who do I contact for support or feedback?</h3>
              <p className="text-black text-lg">
                You can reach our support team at support@zuno.app or use the feedback form in the app. We typically respond within 24 hours. We also have an active community forum where you can connect with other users and share tips.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Can I request a feature or report a bug?</h3>
              <p className="text-black text-lg">
                Absolutely! We welcome all feedback. You can submit feature requests and bug reports through the app's feedback form or email us at feedback@zuno.app. Our team reviews all submissions, and we regularly update our roadmap based on user suggestions.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    
  );
}