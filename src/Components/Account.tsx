import React, { useEffect, useState } from "react";
import { User } from "../Models/User";
import "./Account.css";

const Account: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Récupérez le token du cookie
    const cookieRow = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"));
    let token: string | undefined;

    if (cookieRow) {
      token = cookieRow.split("=")[1];
    }

    // Exit if there's no token
    if (!token) {
      setError("No token found");
      return;
    }

    fetch("http://localhost:3000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des informations de l'utilisateur."
          );
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log("Data received from server:", data); // Add this line to check the data received from the server
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container">
      <div className="user-info">
        <h1>Mon compte</h1>
        <p>Login: {user.login}</p>
        <p>Rôle: {user.role}</p>
      </div>
      <div className="ticket-info">
        <h1>Mes billets</h1>
        {user.tickets.map((ticket, index) => (
          <div key={index} className="ticket">
            <p>ID du billet: {ticket._id}</p>
            <p>Type de billet: {ticket.type}</p>
            {ticket.expirationDate && (
              <p>Date d'expiration: {ticket.expirationDate.toString()}</p>
            )}
            {ticket.accessibleSpaces && ticket.accessibleSpaces.length > 0 && (
              <p>Espaces accessibles: {ticket.accessibleSpaces.join(", ")}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;
