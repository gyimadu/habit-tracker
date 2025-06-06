'use client';

import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const dummyAvatar = 'https://randomuser.me/api/portraits/men/32.jpg';
const userName = 'Alex';
const numDays = 5;

function getFormattedDate() {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const day = now.getDate();
  return `${dayName}, ${month} ${day}`;
}

export default function MobileHome() {
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchCurrentY, setTouchCurrentY] = useState(0);

  const handleBegin = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate loading
  };

  // Modal swipe down logic
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchCurrentY(e.touches[0].clientY);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchCurrentY(e.touches[0].clientY);
  };
  const handleTouchEnd = () => {
    if (touchCurrentY - touchStartY > 80) {
      setShowProfile(false);
      setShowProfileInfo(false);
    }
  };

  const closeModal = () => {
    setShowProfile(false);
    setShowProfileInfo(false);
  };

  return (
    <MobileLayout>
      <div className="pt-6 px-4 pb-4">
        {/* Top Row: Avatar and Date */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => setShowProfile(true)}
            className="focus:outline-none"
            aria-label="Open profile"
          >
            <img
              src={dummyAvatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          </button>
          <span className="text-lg font-semibold text-gray-700">{getFormattedDate()}</span>
        </div>

        {/* Centered Column */}
        <div className="flex flex-col items-center justify-center text-center py-10">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h1>
          <p className="text-lg text-gray-700 mb-8">You&apos;re on a <span className="font-semibold text-blue-600">{numDays}</span> day streak!</p>

          <div className="flex flex-col items-center">
            <button
              className={`w-28 h-28 rounded-full flex items-center justify-center bg-blue-600 shadow-lg transition-all duration-200 ${loading ? 'opacity-80' : ''}`}
              onClick={handleBegin}
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-12 w-12 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" />
                </svg>
              )}
            </button>
            <span className="mt-4 text-base font-medium text-gray-700">Begin Session</span>
          </div>
        </div>

        {/* New Rounded Containers */}
        <div className="space-y-5 mt-4">
          {/* Personalized Plan */}
          <div className="bg-gray-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-lg">Get Your Personalized Plan</h2>
              <span className="ml-2">
                {/* Clipboard List Icon (Heroicons outline) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h3.5a1.5 1.5 0 003 0H17a2 2 0 012 2v12a2 2 0 01-2 2z" />
                </svg>
              </span>
            </div>
            <p className="text-gray-600 text-sm">Start with a plan made just for you</p>
          </div>

          {/* Explore Workouts */}
          <div className="bg-gray-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-lg">Explore Workouts</h2>
              <span className="ml-2">
                {/* Magnifying Glass Icon (Heroicons outline) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </span>
            </div>
            <p className="text-gray-600 text-sm">Find something new to try today!</p>
          </div>
        </div>

        {/* Profile Slide-up Modal */}
        {showProfile && (
          <div
            className="fixed inset-0 z-30 flex items-end justify-center"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div
              className="relative w-full max-w-md mx-auto bg-white rounded-t-3xl p-6 pb-4 z-40 animate-slideup h-[75vh] overflow-y-auto flex flex-col"
              style={{ touchAction: 'none' }}
              onClick={e => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              {/* Modal Content */}
              {!showProfileInfo ? (
                <>
                  {/* Profile Info (summary) */}
                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={dummyAvatar}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 mb-2"
                    />
                    <div className="text-lg font-bold">{userName}</div>
                    <div className="text-gray-500 text-sm">alex@email.com</div>
                  </div>
                  {/* Links */}
                  <nav className="space-y-4">
                    <button
                      className="block w-full text-gray-700 hover:text-blue-600 py-2 text-center text-base"
                      onClick={() => setShowProfileInfo(true)}
                    >
                      Profile
                    </button>
                    <Link href="/support" className="block text-gray-700 hover:text-blue-600 py-2 text-center text-base" onClick={closeModal}>
                      Support
                    </Link>
                    <Link href="/about" className="block text-gray-700 hover:text-blue-600 py-2 text-center text-base" onClick={closeModal}>
                      About
                    </Link>
                    <button
                      onClick={() => { signOut(); closeModal(); }}
                      className="block w-full text-red-600 hover:text-red-700 py-2 text-center text-base font-semibold"
                    >
                      Sign out
                    </button>
                  </nav>
                </>
              ) : (
                <>
                  {/* Profile Info (detailed) */}
                  <button
                    className="mb-4 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowProfileInfo(false)}
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={dummyAvatar}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 mb-2"
                    />
                    <div className="text-xl font-bold mb-1">{userName}</div>
                    <div className="text-gray-500 text-base mb-2">alex@email.com</div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2 w-full text-center">
                      <div className="font-semibold">Age</div>
                      <div className="text-gray-700">25</div>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2 w-full text-center mt-2">
                      <div className="font-semibold">Goals</div>
                      <div className="text-gray-700">Build Muscle, Improve Fitness</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
} 