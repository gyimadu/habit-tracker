'use client';

import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen py-32 px-10 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-left mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">About Grit</h1>
            <p className="text-lg text-gray-600">
              Your personal fitness companion
            </p>
          </div>

          <div className="space-y-8 text-gray-600">
            <p className="text-base leading-relaxed">
              Grit is your dedicated fitness companion, designed to make workout tracking simple and motivating. Whether you&apos;re just starting out or you&apos;re a seasoned athlete, we help you stay consistent and achieve your fitness goals.
            </p>

            <p className="text-base leading-relaxed">
              Track your workouts, set goals, and watch your progress with our intuitive system. From customizable routines to detailed analytics, we provide everything you need to build lasting fitness habits.
            </p>

            <p className="text-base leading-relaxed">
              Join our community of fitness enthusiasts and experience secure, seamless tracking across all your devices. Start your journey to a healthier lifestyle today.
            </p>
          </div>

          <div className="mt-12 text-left">
            <a
              href="/auth/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About; 