'use client';

import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Support = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSubmitted(true);
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen py-32 px-10 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Grit Support</h1>
          <p className="text-gray-600 text-base mb-8">
            Have questions about your account or want to request new features? We&apos;re here to help! 
            Connect with us by email and we&apos;ll get back to you as soon as possible.
          </p>

          {!showForm && !submitted && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Support
            </button>
          )}

          {showForm && !submitted && (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white py-6 rounded-lg shadow-sm">
              <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
                  Email
                </label>
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
                <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-1">
                  Message
                </label>
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

              <div className="flex gap-2 md:gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEmail('');
                    setMessage('');
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 text-center">
              <p className="text-green-800 text-lg font-medium">Thank you for your submission!</p>
              <p className="text-green-600 mt-2">We&apos;ll get back to you as soon as possible.</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setShowForm(true);
                }}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support; 