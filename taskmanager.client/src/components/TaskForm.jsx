// src/components/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ onTaskCreate }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onTaskCreate({ title, dueDate });
        setTitle('');
        setDueDate('');
    };

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-2">Create New Task</h2>
            <div className="mb-2">
                <label className="block">Task Title:</label>
                <input
                    className="border p-2 rounded w-full"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block">Due Date:</label>
                <input
                    className="border p-2 rounded w-full"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
                Create Task
            </button>
        </form>
    );
};

export default TaskForm;
