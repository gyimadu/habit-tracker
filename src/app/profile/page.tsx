'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MobileLayout from '@/components/MobileLayout';

interface ProfileData {
  username: string;
  gender: string;
  age: number;
  weight: number;
  height: {
    feet: number;
    inches: number;
  };
  goals: string[];
}

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSetup, setIsSetup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: session?.user?.name || '',
    gender: '',
    age: 0,
    weight: 150,
    height: {
      feet: 5,
      inches: 8
    },
    goals: []
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
    // Check if device is mobile
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [status, router]);

  useEffect(() => {
    // TODO: Fetch profile data from your backend
    // For now, we'll use localStorage to persist the data
    const savedProfile = localStorage.getItem('profileData');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
      setIsSetup(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save profile data to your backend
    localStorage.setItem('profileData', JSON.stringify(profileData));
    setIsSetup(true);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const profileContent = !isSetup ? (
    <div className="min-h-screen py-32 px-8 md:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-left mb-10">Let&apos;s Get You Started</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-700">Username</label>
            <input
              type="text"
              required
              className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={profileData.username}
              onChange={(e) => setProfileData({...profileData, username: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700">Gender</label>
            <select
              required
              className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={profileData.gender}
              onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700">Age</label>
            <input
              type="number"
              required
              min="13"
              max="100"
              className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={profileData.age || ''}
              onChange={(e) => setProfileData({...profileData, age: parseInt(e.target.value)})}
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700">Weight (lbs)</label>
            <div className="mt-1">
              <input
                type="range"
                min="80"
                max="400"
                step="1"
                className="w-full"
                value={profileData.weight}
                onChange={(e) => setProfileData({...profileData, weight: parseInt(e.target.value)})}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>80 lbs</span>
                <span className="font-medium text-gray-900">{profileData.weight} lbs</span>
                <span>400 lbs</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700">Height</label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500">Feet</label>
                <select
                  required
                  className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={profileData.height.feet}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    height: { ...profileData.height, feet: parseInt(e.target.value) }
                  })}
                >
                  {[4, 5, 6, 7, 8].map((feet) => (
                    <option key={feet} value={feet}>{feet} ft</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500">Inches</label>
                <select
                  required
                  className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={profileData.height.inches}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    height: { ...profileData.height, inches: parseInt(e.target.value) }
                  })}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inches) => (
                    <option key={inches} value={inches}>{inches} in</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700">Workout Goals</label>
            <div className="mt-2 space-y-2">
              {['Build Muscle', 'Lose Weight', 'Improve Fitness', 'Increase Strength', 'Maintain Health'].map((goal) => (
                <label key={goal} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    checked={profileData.goals.includes(goal)}
                    onChange={(e) => {
                      const newGoals = e.target.checked
                        ? [...profileData.goals, goal]
                        : profileData.goals.filter(g => g !== goal);
                      setProfileData({...profileData, goals: newGoals});
                    }}
                  />
                  <span className="ml-2">{goal}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-2xl shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="min-h-screen py-32 px-8 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-3xl text-gray-500">
              {profileData.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold">{profileData.username}</h1>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{profileData.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{profileData.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium">{profileData.weight} lbs</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p className="font-medium">{profileData.height.feet}&apos;{profileData.height.inches}&apos;&apos;</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Workout Goals</h2>
            <div className="flex flex-wrap gap-2">
              {profileData.goals.map((goal) => (
                <span
                  key={goal}
                  className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsSetup(false)}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-2xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return <MobileLayout>{profileContent}</MobileLayout>;
  }

  return (
    <div>
      <NavBar />
      {profileContent}
      <Footer />
    </div>
  );
};

export default Profile; 