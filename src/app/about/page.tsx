'use client';

import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div>
      <NavBar />
      
      <main className="container mx-auto p-5 max-w-6xl">
        <div className="mt-32 mb-20 px-4 md:px-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">About Zuno</h1>
          
          <div className="max-w-3xl space-y-6">
            <p className="text-black text-lg">
              Zuno is a modern habit tracking application designed to help you build better routines and achieve your goals. Our mission is to make habit formation simple, enjoyable, and effective.
            </p>
            
            <p className="text-black text-lg">
              Built with cutting-edge technology and user experience in mind, Zuno combines the power of AI with proven habit-forming techniques to provide personalized insights and keep you motivated on your journey to self-improvement.
            </p>
            
            <p className="text-black text-lg">
              Whether you&apos;re looking to build new habits, break old ones, or simply track your progress, Zuno provides the tools and support you need to succeed.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 