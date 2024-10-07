// src/components/TaskItem.jsx
import React, { useState } from 'react';
import NoteForm from './NoteForm';

const TaskItem = ({ task, onAddNote }) => {
    const [showNoteForm, setShowNoteForm] = useState(false);

    return (
        <li className="mb-4 bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-bold">
                {task.title} - <span className="text-sm">Priority: {task.priority}</span>
            </h3>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>

            <button
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => setShowNoteForm(!showNoteForm)}
            >
                {showNoteForm ? 'Cancel' : 'Add Note'}
            </button>

            {showNoteForm && (
                <NoteForm taskId={task.id} onAddNote={onAddNote} />
            )}

            <div className="mt-4">
                <h4 className="text-md font-semibold">Notes:</h4>
                <ul>
                    {task.notes && task.notes.map(note => (
                        <li key={note.id} className="border-b border-gray-300 py-2">
                            {note.content}
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};

export default TaskItem;
