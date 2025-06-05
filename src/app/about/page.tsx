'use client';

import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Zuno</h1>
            <p className="text-xl text-gray-600">
              Your personal fitness companion
            </p>
          </div>

          <div className="space-y-8 text-gray-600">
            <p className="text-lg leading-relaxed">
              At Zuno, we believe that everyone deserves to achieve their fitness goals. Our mission is to make workout tracking simple, intuitive, and motivating. Whether you&apos;re a beginner or a seasoned athlete, Zuno helps you stay consistent and track your progress towards a healthier lifestyle.
            </p>

            <p className="text-lg leading-relaxed">
              With Zuno, you can easily log your workouts, set goals, and watch your progress over time. Our intuitive tracking system helps you build lasting habits, set reminders, and celebrate your achievements along the way. From customizable workout routines to detailed progress analytics, we provide all the tools you need to succeed.
            </p>

            <p className="text-lg leading-relaxed">
              Join thousands of users who are already achieving their fitness goals with Zuno. Our platform offers secure data storage, cross-device synchronization, and regular updates to ensure you have the best possible experience on your fitness journey.
            </p>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/auth/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
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