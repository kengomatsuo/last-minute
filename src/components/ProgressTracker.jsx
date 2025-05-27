import React, { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const ProgressTracker = ({ courses }) => {
    const [goal, setGoal] = useState(3);

    const completedThisWeek = useMemo(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        if (!courses) return 0;
        
        return courses.filter(course => {
            if (!course.bookingTime?.toDate) return false;
            const courseDate = course.bookingTime.toDate();
            return courseDate >= startOfWeek && courseDate <= endOfWeek && courseDate < new Date();
        }).length;

    }, [courses]);

    const progressPercentage = goal > 0 ? Math.min((completedThisWeek / goal) * 100, 100) : 0;
    
    const incrementGoal = () => setGoal(g => g + 1);
    const decrementGoal = () => setGoal(g => Math.max(1, g - 1));

    return (
        <div className="w-full bg-white border border-[#bdb9a7] rounded-lg px-6 py-6 shadow-sm mt-8">
            <h3 className="text-xl font-bold mb-1">Weekly Goal</h3>
            <p className="text-sm text-[#7d7865] mb-4">You've completed {completedThisWeek} of {goal} sessions this week.</p>

            <div className="w-full bg-[#f3f1e3] rounded-full h-3 mb-4">
                <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <p className="text-sm font-semibold text-[#57534e]">Set Goal:</p>
                <div className="flex items-center gap-2 border border-[#e0dcc8] rounded-md p-1">
                     <button onClick={decrementGoal} className="p-1 rounded hover:bg-[#f3f1e3]">
                        <ChevronDownIcon className="h-5 w-5 text-[#7d7865]" />
                    </button>
                    <span className="font-bold text-lg text-[#3e3c36] w-6 text-center">{goal}</span>
                    <button onClick={incrementGoal} className="p-1 rounded hover:bg-[#f3f1e3]">
                        <ChevronUpIcon className="h-5 w-5 text-[#7d7865]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProgressTracker;