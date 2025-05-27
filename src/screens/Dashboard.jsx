import React, { useContext, useEffect, useState } from 'react';
import { CourseContext } from '../contexts/CourseContext';
import { UserContext } from '../contexts/UserContext';
import UpcomingSchedule from '../components/UpcomingSchedule';
import ProgressTracker from '../components/ProgressTracker';
import QuickRebook from '../components/QuickRebook';

// Helper component for displaying notifications
const NotificationBar = ({ course, reminderType }) => {
    let reminderText = '';

    const courseTime = course.bookingTime?.toDate().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    if (reminderType === 'day') {
        reminderText = `Your course, "${course.topic}" in ${course.subject}, is scheduled for tomorrow at ${courseTime}.`;
    } else if (reminderType === 'minutes') {
        reminderText = `Your course, "${course.topic}" in ${course.subject}, starts in 30 minutes!`;
    }

    if (!reminderText) return null;

    return (
        <div className="bg-[#f3f1e3] border border-[#bdb9a7] rounded-md p-4 mb-8 shadow-sm">
            <h3 className="font-semibold text-lg text-[#57534e]">Reminder ⏰</h3>
            <p className="text-base text-[#7d7865]">{reminderText}</p>
        </div>
    );
};

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const { courses } = useContext(CourseContext);
    const [notifications, setNotifications] = useState([]);
    
    const isTutor = user?.claims?.isTutor;

    useEffect(() => {
        const checkReminders = () => {
            if (!courses) return;
            const now = new Date();
            const upcomingNotifications = [];

            courses.forEach(course => {
                if (!course.bookingTime?.toDate) return;
                const courseTime = course.bookingTime.toDate();
                const timeDiff = courseTime - now;

                const oneDay = 24 * 60 * 60 * 1000;
                const thirtyMinutes = 30 * 60 * 1000;
                
                if (timeDiff > 0 && timeDiff <= thirtyMinutes) {
                    upcomingNotifications.push({ ...course, reminderType: 'minutes' });
                } else if (timeDiff > 0 && timeDiff <= oneDay) {
                     upcomingNotifications.push({ ...course, reminderType: 'day' });
                }
            });
            setNotifications(upcomingNotifications);
        };

        checkReminders();
        const intervalId = setInterval(checkReminders, 60000);
        return () => clearInterval(intervalId);
    }, [courses]);

    // Main view for the student's dashboard
    const StudentDashboard = () => (
        <>
            {/* Main "My Courses" Panel - Full Width */}
            <div className="bg-white border border-[#bdb9a7] rounded-lg px-6 md:px-10 py-8 shadow-sm h-full">
                <h2 className="text-2xl font-bold mb-6">My Courses</h2>
                <div className="divide-y divide-[#e0dcc8]">
                    {courses && courses.length > 0 ? (
                        courses.map(course => (
                            // RESPONSIVE UPDATE: Items stack on mobile, go to row on small screens+
                            <div key={course.id} className="flex flex-col sm:flex-row sm:items-center py-5 gap-4">
                                <div className="flex-1">
                                    <div className="font-bold text-lg">{course.subject}</div>
                                    <div className="font-semibold text-base">{course.topic}</div>
                                    <div className={`mt-1 text-[#7d7865] ${!course.details && 'italic opacity-70'}`}>
                                        {course.details || 'No description'}
                                    </div>
                                </div>
                                {/* RESPONSIVE UPDATE: Buttons stack vertically and take full width on mobile */}
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:min-w-[160px]">
                                    <button className="py-2 px-4 border border-[#bdb9a7] rounded text-[#bdb9a7] font-semibold bg-transparent hover:bg-[#f3f1e3] transition">
                                        Chat
                                    </button>
                                    <button className="py-2 px-4 rounded font-semibold bg-[#bdb9a7] text-white hover:bg-[#a7a083] transition">
                                        Start Session
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-[#7d7865] py-4">You have no upcoming courses. Book one from the Booking page!</p>
                    )}
                </div>
            </div>

            {/* Widget Grid - already responsive */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <UpcomingSchedule courses={courses} />
                <ProgressTracker courses={courses} />
                <QuickRebook courses={courses} />
            </div>
        </>
    );
    
    // Placeholder for the tutor's dashboard view
    const TutorDashboard = () => (
        <div className="bg-white border border-[#bdb9a7] rounded-lg px-10 py-8 shadow-sm h-full">
           <h2 className="text-2xl font-bold mb-6">Tutor Dashboard</h2>
           <p>Welcome, Tutor! Please visit the <a href="/requests" className="underline font-semibold">Requests Page</a> to see pending sessions.</p>
       </div>
    );

    return (
        <div className="min-h-screen bg-[#f8f7f4] font-[Montserrat]">
            {/* RESPONSIVE UPDATE: Navbar stacks on small screens */}
            <nav className="flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 py-6 gap-4 sm:gap-0">
                <span className="text-2xl font-bold">Last Minute</span>
                <div className="flex items-center gap-6 md:gap-10 text-lg">
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
                        <div className="font-semibold text-base leading-tight">{user?.displayName || 'User'}</div>
                        <div className="text-sm text-[#7d7865]">{user?.email}</div>
                    </div>
                </div>
            </nav>

            {/* RESPONSIVE UPDATE: Padding is smaller on mobile */}
            <div className="w-full px-6 md:px-12 py-6">
                {notifications.map(notification => (
                    <NotificationBar
                        key={`${notification.id}-${notification.reminderType}`}
                        course={notification}
                        reminderType={notification.reminderType}
                    />
                ))}

                {isTutor ? <TutorDashboard /> : <StudentDashboard />}
            </div>
        </div>
    );
};

export default Dashboard;