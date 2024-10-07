// src/components/NoteForm.jsx
import React, { useState } from 'react';

const NoteForm = ({ taskId, onAddNote }) => {
    const [noteContent, setNoteContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddNote(taskId, noteContent);
        setNoteContent('');
    };

    return (
        <form className="mt-2" onSubmit={handleSubmit}>
            <div className="mb-2">
                <label className="block">Note Content:</label>
                <input
                    className="border p-2 rounded w-full"
                    type="text"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    required
                />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                Add Note
            </button>
        </form>
    );
};

export default NoteForm;
