import React, { useState } from 'react';

const courses = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Calculus',
    details: 'Differentiation and Integration basics'
  },
  {
    id: 2,
    subject: 'English',
    topic: 'Essay Writing',
    details: 'Structuring arguments in persuasive essays'
  },
  {
    id: 3,
    subject: 'Science',
    topic: 'Physics',
    details: 'aaaaa'
  }
];


const Dashboard = () => (
  <div className="min-h-screen bg-white font-[Montserrat]">
    {/* Navbar */}
    <nav className="flex items-center justify-between px-12 py-6">
      <span className="text-2xl font-bold">Last Minute</span>
      <div className="flex gap-10 text-lg">
        <a href="/dashboard" className="underline font-semibold">Dashboard</a>
        <a href="/booking" className="hover:underline">Booking</a>
        <a href="/history" className="hover:underline">History</a>
        <a href="/settings" className="hover:underline">Settings</a>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-[#bdb9a7] flex items-center justify-center">
          <svg width="24" height="24" fill="none" stroke="#bdb9a7" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-base leading-tight">Jonathan Alyson Salim</div>
          <div className="text-sm text-[#7d7865]">jonathanalysonsalim@gmail.com</div>
        </div>
      </div>
    </nav>

    {/* Dashboard Card */}
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-3xl bg-white border border-[#bdb9a7] rounded-lg px-10 py-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">My Courses</h2>
        <div className="divide-y divide-[#e0dcc8]">
          {courses.map(course => (
            <div key={course.id} className="flex items-center py-5 gap-6">
              <div className="flex-1">
                <div className="font-bold text-lg">{course.subject}</div>
                <div className="font-semibold text-base">{course.topic}</div>
                <div className={`mt-1 text-[#7d7865] ${!course.details && 'italic opacity-70'}`}>
                  {course.details || 'No description'}
                </div>
              </div>
              <div className="flex flex-col gap-2 min-w-[160px]">
                <button className="py-2 border border-[#bdb9a] rounded text-[#bdb9a7] font-semibold bg-transparent hover:bg-[#f3f1e3] transition">
                  Chat
                </button>
                <button className="py-2 rounded font-semibold bg-[#bdb9a7] text-white hover:bg-[#a7a083] transition">
                  Start Session
                </button>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
