import { useState, useCallback } from "react";
import axios from "axios";
const useSearch = (userId) => {
    const [projects, setProjects] = useState([]);
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const searchByUserId = useCallback(async (query) => {
        if (!query) {
            setProjects([]);
            setTask([]);
            return;
          }
      
          console.log("Requête de recherche avec query :", query); 
      setLoading(true);
      setError(null);
  
      try {
        // Appel de la route dédiée aux projets de l'utilisateur avec le paramètre `query`
        const projectsResponse = await axios.get(`http://localhost:8080/projects/user/${userId}`, {
          params: { query },
        });
        console.log("Réponse projets:", projectsResponse.data);
        setProjects(projectsResponse.data.data);
  
        // Appel de la route dédiée aux tâches de l'utilisateur
        const tasksResponse = await axios.get(`http://localhost:8080/task/user/${userId}`, {
          params: { query },
        });
        console.log("Réponse tache:", tasksResponse.data);
        setTask(tasksResponse.data.data);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        setError("Une erreur est survenue lors de la recherche.");
      } finally {
        setLoading(false);
      }
    }, [userId]);
  
    return { projects, task, loading, error, searchByUserId };
  };
  
  export default useSearch;