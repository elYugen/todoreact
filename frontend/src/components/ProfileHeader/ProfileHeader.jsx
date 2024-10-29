import React, { useEffect } from 'react';
import { useAuth } from '../../hook/useAuth';
import Loading from '../Loading/Loading';
import ProfileHeader from 'frontend\src\components\ProfileHeader\ProfileHeader.css';

function ProfileHeader () {

    //utilise le hook d'auth pour accéder aux données utilisateur
    const { user, loading, error, fetchUserInfo } = useAuth();

    useEffect(() => {
        if(!user) {
            fetchUserInfo();
        }
    }, [fetchUserInfo]);

    
}