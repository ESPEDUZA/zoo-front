import React from "react";

type TicketProps = {
  ticket: {
    _id: string;
    type: string;
    expirationDate: Date;
    accessibleSpaces: string[];
  };
};

const Ticket: React.FC<TicketProps> = ({ ticket }) => {
  return (
    <div className="ticket">
      <p>ID du billet: {ticket._id}</p>
      <p>Type de billet: {ticket.type}</p>
      <p>
        Date d'expiration:{" "}
        {new Date(ticket.expirationDate).toLocaleDateString()}
      </p>
      <p>Espaces accessibles: {ticket.accessibleSpaces.join(", ")}</p>
    </div>
  );
};

export default Ticket;
