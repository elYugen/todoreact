import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure Axios pour inclure automatiquement les cookies dans les requêtes
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:8080';

  // Fonction pour récupérer les informations de l'utilisateur
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('/auth/me');
      console.log(response.data);
      setUser(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setUser(null);
      } else {
        setError('Erreur lors de la récupération des informations utilisateur');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion
  const login = async ({ email, password }) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      setUser(response.data);
      setError(null);
      console.log("Utilisateur connecté :", response.data); // Ajout de log pour le succès de la connexion
    } catch (err) {
      setError(err.response?.data.message || 'Erreur de connexion');
      console.error("Erreur de connexion :", err); // Ajout de log pour l'erreur de connexion
      throw err;
    }
  };

  // Fonction d'inscription
  const register = async ({ username, email, password }) => {
    try {
      await axios.post('/auth/register', { username, email, password });
      await login({ email, password });
    } catch (err) {
      setError(err.response?.data.message || 'Erreur lors de l\'inscription');
      throw err;
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
    } catch (err) {
      setError('Erreur lors de la déconnexion');
    }
  };

  // Vérification de l'authentification au chargement
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      logout,
      register,
      fetchUserInfo
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
