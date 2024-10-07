import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, addNoteToTask } from './utils/api';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks on component mount
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    // Handle task creation
    const handleTaskCreate = async (taskData) => {
        try {
            const newTask = await createTask(taskData);
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    // Handle adding a note to a task
    const handleAddNote = async (taskId, noteContent) => {
        try {
            const updatedTask = await addNoteToTask(taskId, noteContent);
            setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
        } catch (error) {
            console.error('Error adding note to task:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <TaskForm onTaskCreate={handleTaskCreate} />
            <TaskList tasks={tasks} onAddNote={handleAddNote} />
        </div>
    );
};

export default App;