import React from 'react';

// Helper to format the date nicely
const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const UpcomingSchedule = ({ courses }) => {
    // Get the next 3 upcoming courses that have a booking time
    const upcomingCourses = courses && courses
        .filter(course => course.bookingTime?.toDate)
        .sort((a, b) => a.bookingTime.toDate() - b.bookingTime.toDate())
        .slice(0, 3);

    return (
        <div className="w-full bg-white border border-[#bdb9a7] rounded-lg px-6 py-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Upcoming Sessions</h3>
            {upcomingCourses && upcomingCourses.length > 0 ? (
                <ul className="space-y-4">
                    {upcomingCourses.map(course => (
                        <li key={course.id} className="flex items-center gap-4 p-3 bg-[#f9f8f2] rounded-md">
                            <div className="flex-shrink-0 text-center bg-[#e0dcc8] p-2 rounded-md w-16">
                                <p className="font-bold text-sm text-[#57534e]">
                                    {formatDate(course.bookingTime.toDate())}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-base text-[#3e3c36]">{course.topic}</p>
                                <p className="text-sm text-[#7d7865]">
                                    {course.bookingTime.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-center text-[#7d7865] py-4">
                    No sessions scheduled.
                </p>
            )}
        </div>
    );
};

export default UpcomingSchedule;