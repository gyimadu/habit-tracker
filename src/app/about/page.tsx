'use client';

import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Zuno</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your personal fitness journey companion
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At Zuno, we believe that everyone deserves to achieve their fitness goals. 
            Our mission is to make workout tracking simple, intuitive, and motivating. 
            Whether you're a beginner or a seasoned athlete, Zuno helps you stay consistent 
            and track your progress towards a healthier lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Track Your Progress</h2>
            <p className="text-gray-600">
              Log your workouts, set goals, and watch your progress over time. 
              Zuno makes it easy to stay accountable and motivated on your fitness journey.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stay Consistent</h2>
            <p className="text-gray-600">
              Build lasting habits with our intuitive tracking system. 
              Set reminders, track streaks, and celebrate your achievements along the way.
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Zuno?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-4">
            <li>Simple and intuitive workout tracking</li>
            <li>Customizable workout routines</li>
            <li>Progress visualization and analytics</li>
            <li>Secure and private data storage</li>
            <li>Cross-device synchronization</li>
            <li>Regular updates and new features</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of users who are already achieving their fitness goals with Zuno.
          </p>
          <a
            href="/auth/signup"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About; 