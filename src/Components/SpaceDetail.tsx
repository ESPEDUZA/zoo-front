import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Space} from "../Models/space";
import './SpaceDetail.css'
import {Animal} from "../Models/animal";
import AnimalBox from "./AnimalBox"

function SpaceDetail() {
    const { id } = useParams<{id?: string}>();
    const [space, setSpace] = useState<Space>();
    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        fetch(`http://localhost:3000/spaces/${id}`)
            .then(response => response.json())
            .then(data => setSpace(data))
            .catch(error => console.error('Erreur:', error));
    }, [id]);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/animals/space/${id}`)
                .then(response => response.json())
                .then(data => setAnimals(data))
                .catch(error => console.error('Erreur:', error));
        }
    }, [id]);

    if (!space) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-detail">
            <div className="details">
                <h2>{space.name}</h2>
                <p className="description">{space.description}</p>
                <p>Type: {space.type}</p>
                <p>Capacity: {space.capacity}</p>
                <p>Duration: {space.duration}</p>
                <p>Opening Hours: {space.openingHours}</p>
                <p>Accessibility: {space.accessibility ? 'Yes' : 'No'}</p>
                <p>Maintenance: {space.maintenance ? 'Yes' : 'No'}</p>
                <button className="edit-button">Modifier</button>
                <button className="delete-button">Supprimer</button>
            </div>
            <div className="animal">
                <h2>Animals:</h2>
                {animals.length > 0 ? (
                    animals.map((animal, i) => (
                        <AnimalBox key={animal._id} animal={animal} />
                    ))
                ) : (
                    <p>No animals in this space</p>
                )}
            </div>
        </div>
    );
}

export default SpaceDetail;
