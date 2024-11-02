import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserTasks = (userId) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserTasks = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(`https://todoback-production-2aac.up.railway.app/task/user/${userId}`, { withCredentials: true });
                
                setTasks(response.data.data);
            } catch (err) {
                setError(
                    err.response?.data?.message || 
                    "Une erreur est survenue lors de la récupération des projets"
                );
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserTasks();
        } else {
            setTasks([]);
            setLoading(false);
        }
    }, [userId]);

    return {
        tasks,
        setTasks,
        loading,
        error,
    };
};

export default useUserTasks;