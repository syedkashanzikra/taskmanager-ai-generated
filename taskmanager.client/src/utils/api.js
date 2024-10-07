// src/utils/api.js

import axios from 'axios';

// Axios instance to manage API calls
export const apiClient = axios.create({
    baseURL: '/api',  // The proxy handles forwarding to https://localhost:7056/api
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get all tasks
export const getTasks = async () => {
    try {
        const response = await apiClient.get('/tasks');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

// Create a new task
export const createTask = async (taskData) => {
    try {
        const response = await apiClient.post('/tasks', taskData);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// Add a note to a specific task
export const addNoteToTask = async (taskId, noteContent) => {
    try {
        const response = await apiClient.post(`/tasks/${taskId}/notes`, {
            content: noteContent,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding note to task:', error);
        throw error;
    }
};
