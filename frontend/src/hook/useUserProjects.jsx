import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserProjects = (userId) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(`http://localhost:8080/projects/user/${userId}`, { withCredentials: true });
                
                // ajoute le nombre de tâches à chaque projet
                const projectsWithTaskCount = response.data.data.map(project => ({
                    ...project,
                    taskCount: project.tasks ? project.tasks.length : 0
                }));
                
                setProjects(projectsWithTaskCount);
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
            fetchUserProjects();
        } else {
            setProjects([]);
            setLoading(false);
        }
    }, [userId]);

    return {
        projects,
        loading,
        error,
    };
};

export default useUserProjects;