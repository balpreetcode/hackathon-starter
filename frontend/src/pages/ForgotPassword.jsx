import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { success } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only - no backend implementation
    setSubmitted(true);
    success('Password reset link sent! (UI only)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-4">
            <span className="text-3xl text-white font-bold">H</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Forgot password?</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {submitted ? 'Check your email' : 'We\'ll send you a reset link'}
          </p>
        </div>

        <div className="card p-8">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                If an account exists for <strong>{email}</strong>, you will receive a password reset link.
              </p>
              <Link to="/login" className="inline-block btn btn-primary">
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <button type="submit" className="w-full btn btn-primary">
                Send reset link
              </button>

              <div className="text-center">
                <Link to="/login" className="text-sm text-primary-600 hover:text-primary-700">
                  ← Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
