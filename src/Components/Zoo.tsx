import React, { useEffect, useState } from "react";
import { Animal } from "../Models/animal";

const Zoo: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetchAnimals();
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

  return (
    <div>
      <h1>Welcome to the Zoo!</h1>
      <h2>List of Animals and Their Spaces</h2>
      <div className="animal-list">
        {animals.map((animal) => (
          <div key={animal._id} className="animal-card">
            <img src={animal.image} alt={animal.name} />
            <h3>{animal.name}</h3>
            <p>Species: {animal.species}</p>
            <p>Description: {animal.description}</p>
            <p>Space: {animal.space}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Zoo;
