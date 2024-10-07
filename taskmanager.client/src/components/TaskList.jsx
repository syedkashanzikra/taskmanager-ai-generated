// src/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onAddNote }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} onAddNote={onAddNote} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
