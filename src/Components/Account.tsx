import React, { useEffect, useState } from 'react';

interface User {
    _id: string;
    login: string;
    password: string;
    role: string;
}

const Account: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Récupérez le token du cookie
        const cookieRow = document.cookie.split('; ').find(row => row.startsWith('token'));
        let token: string | undefined;

        if (cookieRow) {
            token = cookieRow.split('=')[1];
        }

        // Exit if there's no token
        if (!token) {
            setError("No token found");
            return;
        }

        fetch('http://localhost:3000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des informations de l\'utilisateur.');
                }
                return response.json();
            })
            .then(data => setUser(data))
            .catch(error => setError(error.message));
    }, []);

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    if (!user) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>Mon compte</h1>
            <p>Login: {user.login}</p>
            <p>Rôle: {user.role}</p>
        </div>
    );
};

export default Account;
