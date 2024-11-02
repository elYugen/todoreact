import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserHabits = (userId) => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserHabits = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(`https://todoback-production-2aac.up.railway.app/habitstrackers/user/${userId}`, { withCredentials: true });
                
                setHabits(response.data.data);
            } catch (err) {
                setError(
                    err.response?.data?.message || 
                    "Une erreur est survenue lors de la récupération des habitudes"
                );
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserHabits();
        } else {
            setHabits([]);
            setLoading(false);
        }
    }, [userId]);

    return {
        habits,
        loading,
        error,
    };
};

export default useUserHabits;