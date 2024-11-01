import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewFeedbacks = () => {
    const [users, setUsers] = useState([]); 
    const [feedbacks, setFeedbacks] = useState([]); 
    const [selectedUser, setSelectedUser] = useState(null); 

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchFeedbacks = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/feedback/${userId}`); 
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user); 
        fetchFeedbacks(user.id); 
    };

    useEffect(() => {
        fetchUsers(); 
    }, []);

    return (
        <div>
            <h2>Feedbacks</h2>
            <h3>Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <div>
                    <h3>Feedback for {selectedUser.name}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Question</th> {/* Updated header */}
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback) => (
                                <tr key={feedback.questionId}>
                                    <td>{feedback.questionText}</td> {/* Changed to display questionText */}
                                    <td>{feedback.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewFeedbacks;
