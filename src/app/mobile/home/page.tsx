'use client';

import React, { useState, useEffect } from 'react';
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
  const [profile, setProfile] = useState<{ username: string; avatar: string; gender: string; age: number; weight: number; height: { feet: number; inches: number }; goals: string[] }>({ username: '', avatar: '', gender: '', age: 18, weight: 150, height: { feet: 5, inches: 8 }, goals: [] });
  const [editMode, setEditMode] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editAge, setEditAge] = useState(18);
  const [editWeight, setEditWeight] = useState(150);
  const [editHeight, setEditHeight] = useState({ feet: 5, inches: 8 });
  const [editGoals, setEditGoals] = useState<string[]>([]);
  const [modalView, setModalView] = useState<'menu' | 'profile' | 'edit' | 'about' | 'support'>('menu');

  useEffect(() => {
    const stored = localStorage.getItem('profileData');
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfile(parsed);
      setEditUsername(parsed.username || '');
      setEditAvatar(parsed.avatar || '');
      setEditGender(parsed.gender || '');
      setEditAge(parsed.age || 18);
      setEditWeight(parsed.weight || 150);
      setEditHeight(parsed.height || { feet: 5, inches: 8 });
      setEditGoals(parsed.goals || []);
    }
  }, [showProfile, editMode]);

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
      setEditMode(false);
    }
  };

  const closeModal = () => {
    setShowProfile(false);
    setShowProfileInfo(false);
    setEditMode(false);
    setModalView('menu');
  };

  const handleEditSave = () => {
    const updated = {
      username: editUsername,
      avatar: editAvatar,
      gender: editGender,
      age: editAge,
      weight: editWeight,
      height: editHeight,
      goals: editGoals,
    };
    setProfile(updated);
    localStorage.setItem('profileData', JSON.stringify(updated));
    setEditMode(false);
  };

  // Helper for avatar display
  const renderAvatar = (size = 'w-12 h-12') => {
    if (profile.avatar) {
      return (
        <img
          src={profile.avatar}
          alt="Avatar"
          className={`${size} rounded-full object-cover border-2 border-gray-200`}
        />
      );
    } else if (profile.username) {
      return (
        <div className={`${size} rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200 text-gray-500 font-bold text-xl`}>
          {profile.username.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return (
        <div className={`${size} rounded-full bg-gray-100 border-2 border-gray-200`} />
      );
    }
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
            {renderAvatar()}
          </button>
          <span className="text-lg font-semibold text-gray-700">{getFormattedDate()}</span>
        </div>

        {/* Centered Column */}
        <div className="flex flex-col items-center justify-center text-center py-10">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {profile.username || 'User'}!</h1>
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
              {/* Modal Content by view */}
              {modalView === 'menu' && (
                <>
                  <div className="flex flex-col items-center mb-6">
                    {renderAvatar('w-16 h-16')}
                    <div className="text-lg font-bold">{profile.username || 'User'}</div>
                  </div>
                  <nav className="space-y-4">
                    <button className="block w-full text-gray-700 hover:text-blue-600 py-2 text-center text-lg" onClick={() => { setShowProfileInfo(true); setModalView('profile'); }}>
                      Profile
                    </button>
                    <button className="block w-full text-gray-700 hover:text-blue-600 py-2 text-center text-lg" onClick={() => setModalView('about')}>
                      About
                    </button>
                    <button className="block w-full text-gray-700 hover:text-blue-600 py-2 text-center text-lg" onClick={() => setModalView('support')}>
                      Support
                    </button>
                    <button onClick={() => { signOut(); closeModal(); }} className="block w-full text-red-600 hover:text-red-700 py-2 text-center text-lg font-normal">
                      Sign out
                    </button>
                  </nav>
                </>
              )}
              {modalView === 'profile' && !editMode && (
                <>
                  <button className="mb-4 flex items-center text-gray-500 hover:text-gray-700" onClick={() => { setShowProfileInfo(false); setModalView('menu'); }}>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <div className="flex flex-col items-center mb-6">
                    {renderAvatar('w-20 h-20')}
                    <div className="text-xl font-bold mb-1">{profile.username || 'User'}</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 w-full mb-4">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <div className="text-xs text-gray-500">Gender</div>
                        <div className="font-medium text-sm">{profile.gender || '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Age</div>
                        <div className="font-medium text-sm">{profile.age ? `${profile.age} years` : '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Weight</div>
                        <div className="font-medium text-sm">{profile.weight ? `${profile.weight} lbs` : '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Height</div>
                        <div className="font-medium text-sm">{profile.height ? `${profile.height.feet}'${profile.height.inches}''` : '-'}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Workout Goals</div>
                      <div className="flex flex-wrap gap-2">
                        {profile.goals && profile.goals.length > 0 ? (
                          profile.goals.map((goal: string) => (
                            <span key={goal} className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">{goal}</span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">No goals set</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold w-full" onClick={() => setEditMode(true)}>
                    Edit Profile
                  </button>
                </>
              )}
              {modalView === 'profile' && editMode && (
                <>
                  <button
                    className="mb-4 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setEditMode(false)}
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <form className="flex flex-col items-center mb-6 space-y-3 w-full" onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
                    {/* Avatar */}
                    {editAvatar ? (
                      <img src={editAvatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 mb-2" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200 text-gray-500 font-bold text-3xl mb-2">
                        {editUsername.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <input
                      type="text"
                      className="mt-2 mb-2 px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full text-center"
                      value={editAvatar}
                      onChange={e => setEditAvatar(e.target.value)}
                      placeholder="Avatar URL (optional)"
                    />
                    {/* Username */}
                    <input
                      type="text"
                      className="mt-2 mb-2 px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full text-center"
                      value={editUsername}
                      onChange={e => setEditUsername(e.target.value)}
                      placeholder="Username"
                      required
                    />
                    {/* Gender */}
                    <select
                      required
                      className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={editGender}
                      onChange={e => setEditGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {/* Age */}
                    <input
                      type="number"
                      required
                      min="13"
                      max="100"
                      className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={editAge}
                      onChange={e => setEditAge(Number(e.target.value))}
                      placeholder="Age"
                    />
                    {/* Weight */}
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
                      <input
                        type="range"
                        min="80"
                        max="400"
                        step="1"
                        className="w-full"
                        value={editWeight}
                        onChange={e => setEditWeight(Number(e.target.value))}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>80 lbs</span>
                        <span className="font-medium text-gray-900">{editWeight} lbs</span>
                        <span>400 lbs</span>
                      </div>
                    </div>
                    {/* Height */}
                    <div className="w-full grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500">Feet</label>
                        <select
                          required
                          className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editHeight.feet}
                          onChange={e => setEditHeight({ ...editHeight, feet: Number(e.target.value) })}
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
                          className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editHeight.inches}
                          onChange={e => setEditHeight({ ...editHeight, inches: Number(e.target.value) })}
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inches) => (
                            <option key={inches} value={inches}>{inches} in</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Goals */}
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">Workout Goals</label>
                      <div className="mt-2 space-y-2">
                        {['Build Muscle', 'Lose Weight', 'Improve Fitness', 'Increase Strength', 'Maintain Health'].map((goal) => (
                          <label key={goal} className="inline-flex items-center mr-4">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              checked={editGoals.includes(goal)}
                              onChange={e => {
                                const newGoals = e.target.checked
                                  ? [...editGoals, goal]
                                  : editGoals.filter(g => g !== goal);
                                setEditGoals(newGoals);
                              }}
                            />
                            <span className="ml-2 text-sm">{goal}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold w-full"
                    >
                      Save
                    </button>
                  </form>
                </>
              )}
              {modalView === 'about' && (
                <>
                  <button className="mb-4 flex items-center text-gray-500 hover:text-gray-700" onClick={() => setModalView('menu')}>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <div className="mb-6 overflow-y-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                    <h1 className="text-xl font-bold text-gray-900 mb-6 mt-4">About Grit</h1>
                    <p className="text-base text-gray-600 mb-6">Your personal fitness companion</p>
                    <div className="space-y-4 text-gray-600">
                      <p className="text-base leading-relaxed">Grit is your dedicated fitness companion, designed to make workout tracking simple and motivating. Whether you&apos;re just starting out or you&apos;re a seasoned athlete, we help you stay consistent and achieve your fitness goals.</p>
                      <p className="text-base leading-relaxed">Track your workouts, set goals, and watch your progress with our intuitive system. From customizable routines to detailed analytics, we provide everything you need to build lasting fitness habits.</p>
                      <p className="text-base leading-relaxed">Join our community of fitness enthusiasts and experience secure, seamless tracking across all your devices. Start your journey to a healthier lifestyle today.</p>
                    </div>
                    <div className="mt-8 text-left">
                      <button onClick={() => setModalView('menu')} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800">Get Started Now</button>
                    </div>
                  </div>
                </>
              )}
              {modalView === 'support' && (
                <>
                  <button className="mb-4 flex items-center text-gray-500 hover:text-gray-700" onClick={() => setModalView('menu')}>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <div className="mb-6 overflow-y-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                    <h1 className="text-xl font-bold text-gray-900 mb-6 mt-4">Grit Support</h1>
                    <p className="text-gray-600 text-base mb-4">Have questions about your account or want to request new features? We&apos;re here to help! Connect with us by email and we&apos;ll get back to you as soon as possible.</p>
                    {/* Simple support form for modal */}
                    <SupportForm />
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

// Add a simple support form component for the modal
function SupportForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setMessage('');
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <p className="text-green-800 text-lg font-medium">Thank you for your submission!</p>
        <p className="text-green-600 mt-2">We&apos;ll get back to you as soon as possible.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white py-4 rounded-lg shadow-sm">
      <div>
        <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border text-base border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-1">Message</label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border text-base border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="How can we help you?"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Submit</button>
        <button type="button" onClick={() => { setEmail(''); setMessage(''); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Clear</button>
      </div>
    </form>
  );
}

/* Add this to your global CSS if you don't have the Tailwind plugin:
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
*/ 