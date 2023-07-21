import React, { useEffect, useState } from "react";
import { Animal } from "../Models/animal";

const Zoo: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [newAnimal, setNewAnimal] = useState<Partial<Animal>>({
    name: "",
    species: "",
    description: "",
    image: "",
    treatmentRecords: [],
    space: "",
  });
  const [updatedAnimal, setUpdatedAnimal] = useState<Partial<Animal>>({});
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchAnimals();
    // Fetch the user role from the server
    fetchUserRole();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await fetch("http://localhost:3000/animals");
      const data = await response.json();
      setAnimals(data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const fetchUserRole = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const userData = await response.json();
      setUserRole(userData.role);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const createAnimal = async () => {
    try {
      const response = await fetch("http://localhost:3000/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(newAnimal),
      });
      if (response.ok) {
        alert("Animal created successfully");
        fetchAnimals();
        setNewAnimal({
          name: "",
          species: "",
          description: "",
          image: "",
          treatmentRecords: [],
          space: "",
        });
      } else {
        alert("Error creating animal");
      }
    } catch (error) {
      console.error("Error creating animal:", error);
    }
  };

  const updateAnimal = async (animalId: string) => {
    try {
      const selectedAnimal = animals.find((animal) => animal._id === animalId);
      if (selectedAnimal) {
        setUpdatedAnimal({ ...selectedAnimal });
      }
    } catch (error) {
      console.error("Error updating animal:", error);
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAnimal({ ...updatedAnimal, [name]: value });
  };

  const saveUpdatedAnimal = async (animalId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/animals/${animalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(updatedAnimal),
        }
      );
      if (response.ok) {
        alert("Animal updated successfully");
        fetchAnimals();
        setUpdatedAnimal({});
      } else {
        alert("Error updating animal");
      }
    } catch (error) {
      console.error("Error updating animal:", error);
    }
  };

  const deleteAnimal = async (animalId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/animals/${animalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (response.ok) {
        alert("Animal deleted successfully");
        fetchAnimals();
      } else {
        alert("Error deleting animal");
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
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
      <h1>Welcome to the Zoo!</h1>
      {userRole === "admin" && (
        <div>
          <h2>Create a New Animal</h2>
          <form
            className="create-animal-form"
            onSubmit={(e) => {
              e.preventDefault();
              createAnimal();
            }}
          >
            <label>
              Name:
              <input
                type="text"
                value={newAnimal.name}
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, name: e.target.value })
                }
              />
            </label>
            <label>
              Species:
              <input
                type="text"
                value={newAnimal.species}
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, species: e.target.value })
                }
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={newAnimal.description}
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, description: e.target.value })
                }
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                value={newAnimal.image}
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, image: e.target.value })
                }
              />
            </label>
            <label>
              Space:
              <input
                type="text"
                value={newAnimal.space}
                onChange={(e) =>
                  setNewAnimal({ ...newAnimal, space: e.target.value })
                }
              />
            </label>
            <button type="submit">Create Animal</button>
          </form>
        </div>
      )}
      <h2>List of Animals and Their Spaces</h2>
      <div className="animal-list">
        {animals.map((animal) => (
          <div key={animal._id} className="animal-card">
            <img src={animal.image} alt={animal.name} />
            <h3>{animal.name}</h3>
            <p>Species: {animal.species}</p>
            <p>Description: {animal.description}</p>
            <p>Space: {animal.space}</p>
            {userRole === "admin" && (
              <div>
                <button onClick={() => updateAnimal(animal._id)}>Update</button>
                <button onClick={() => deleteAnimal(animal._id)}>Delete</button>
              </div>
            )}
            {animal._id === updatedAnimal._id && (
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={updatedAnimal.name}
                    onChange={handleUpdateChange}
                  />
                </label>
                <label>
                  Species:
                  <input
                    type="text"
                    name="species"
                    value={updatedAnimal.species}
                    onChange={handleUpdateChange}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={updatedAnimal.description}
                    onChange={handleUpdateChange}
                  />
                </label>
                <label>
                  Image URL:
                  <input
                    type="text"
                    name="image"
                    value={updatedAnimal.image}
                    onChange={handleUpdateChange}
                  />
                </label>
                <label>
                  Space:
                  <input
                    type="text"
                    name="space"
                    value={updatedAnimal.space}
                    onChange={handleUpdateChange}
                  />
                </label>
                <button onClick={() => saveUpdatedAnimal(animal._id)}>
                  Save
                </button>
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Zoo;
