import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les informations de l'utilisateur
  const fetchUserInfo = async () => {
    try {
      // Appel à l'API /me avec les credentials pour que les cookies de session soient envoyés
      const response = await fetch('http://localhost:8080/auth/me', {
        credentials: 'include', // Important pour les sessions !
      });

      if (!response.ok) {
        if (response.status === 401) {
          setUser(null);
          return;
        }
        throw new Error('Erreur lors de la récupération des informations utilisateur');
      }

      const userData = await response.json();
      console.log('Données utilisateur récupérées dans fetchUserInfo:', userData); // Log pour vérifier l'utilisateur
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion
  const login = async ({ email, password }) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        credentials: 'include', // Important pour les sessions !
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const userData = await response.json();
      console.log('Données utilisateur après connexion:', userData); // Log pour vérifier l'utilisateur

      setUser(userData);
      setError(null);

      // Recharger les informations utilisateur après la connexion
      await fetchUserInfo();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Fonction d'inscription
  const register = async ({ username, email, password }) => {
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }

      const userData = await response.json();
      console.log('Données utilisateur après inscription:', userData); // Log pour vérifier l'utilisateur

      // Après l'inscription réussie, on connecte automatiquement l'utilisateur
      await login({ username, password });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        credentials: 'include', // Important pour les sessions !
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
      }

      setUser(null);
    } catch (err) {
      setError(err.message);
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
