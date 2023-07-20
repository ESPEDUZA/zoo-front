import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import "./TicketManagement.css";

interface TicketData {
  _id: string;
  type: string;
  expirationDate: string;
  accessibleSpaces: string;
}

const TicketManagement: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]); // Fix 1: Provide the TicketData[] type
  const [newTicket, setNewTicket] = useState({
    type: "",
    expirationDate: "",
    accessibleSpaces: "",
  });
  const [updatedTicket, setUpdatedTicket] = useState<TicketData>({
    // Fix 2: Provide the TicketData type
    _id: "",
    type: "",
    expirationDate: "",
    accessibleSpaces: "",
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:3000/tickets", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const createTicket = async () => {
    try {
      const response = await fetch("http://localhost:3000/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(newTicket),
      });
      if (response.ok) {
        alert("Ticket created successfully");
        fetchTickets();
      } else {
        alert("Error creating ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const updateTicket = async (ticketId: string) => {
    try {
      // Set the updatedTicket state with the values of the selected ticket
      const selectedTicket = tickets.find((ticket) => ticket._id === ticketId);
      if (selectedTicket) {
        setUpdatedTicket({ ...selectedTicket });
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTicket({ ...updatedTicket, [name]: value });
  };

  const saveUpdatedTicket = async (ticketId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tickets/${ticketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(updatedTicket),
        }
      );
      if (response.ok) {
        alert("Ticket updated successfully");
        fetchTickets();
      } else {
        alert("Error updating ticket");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const deleteTicket = async (ticketId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tickets/${ticketId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (response.ok) {
        alert("Ticket deleted successfully");
        fetchTickets();
      } else {
        alert("Error deleting ticket");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const purchaseTicket = async (ticketId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/tickets/${ticketId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (response.ok) {
        alert("Ticket purchased successfully");
        fetchTickets();
      } else {
        alert("Error purchasing ticket");
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    }
  };

  const getToken = () => {
    const cookieRow = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"));
    return cookieRow ? cookieRow.split("=")[1] : "";
  };

  return (
    <div>
      <h1>Ticket Management</h1>
      <div className="TicketManagement">
        <h2>Create a New Ticket</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Type:
            <input
              type="text"
              value={newTicket.type}
              onChange={(e) =>
                setNewTicket({ ...newTicket, type: e.target.value })
              }
            />
          </label>
          <label>
            Expiration Date:
            <input
              type="date"
              value={newTicket.expirationDate}
              onChange={(e) =>
                setNewTicket({ ...newTicket, expirationDate: e.target.value })
              }
            />
          </label>
          <label>
            Accessible Spaces (comma-separated):
            <input
              type="text"
              value={newTicket.accessibleSpaces}
              onChange={(e) =>
                setNewTicket({ ...newTicket, accessibleSpaces: e.target.value })
              }
            />
          </label>
          <button onClick={createTicket}>Create Ticket</button>
        </form>
      </div>
      <div>
        <h2>All Tickets</h2>
        {tickets.map((ticket: any) => (
          <div key={ticket._id} className="ticket-card">
            <Ticket ticket={ticket} />
            <button onClick={() => updateTicket(ticket._id)}>Update</button>
            <button onClick={() => deleteTicket(ticket._id)}>Delete</button>
            <button onClick={() => purchaseTicket(ticket._id)}>Purchase</button>
            <div
              style={{
                display: ticket._id === updatedTicket._id ? "block" : "none",
              }}
            >
              {/* Form to update ticket */}
              <label>
                Type:
                <input
                  type="text"
                  name="type"
                  value={updatedTicket.type}
                  onChange={handleUpdateChange}
                />
              </label>
              <label>
                Expiration Date:
                <input
                  type="date"
                  name="expirationDate"
                  value={updatedTicket.expirationDate}
                  onChange={handleUpdateChange}
                />
              </label>
              <label>
                Accessible Spaces (comma-separated):
                <input
                  type="text"
                  name="accessibleSpaces"
                  value={updatedTicket.accessibleSpaces}
                  onChange={handleUpdateChange}
                />
              </label>
              <button onClick={() => saveUpdatedTicket(ticket._id)}>
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketManagement;
