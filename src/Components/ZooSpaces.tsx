import React, { useEffect, useState } from 'react';
import './ZooSpaces.css'
import { useNavigate } from 'react-router-dom';
import {Space} from "../Models/space";

function ZooSpaces() {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/spaces/')
            .then(response => response.json())
            .then(data => setSpaces(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const handleDetailClick = (id: string) => {
        navigate(`/spaces/${id}`);
    };

    return (
        <div className='ZooSpaces'>
            {spaces.map((space, index) => (
                <div key={index} className="panel">
                    <h2>{space.name}</h2>
                    <p className="description">{space.description}</p>
                    <p>Type: {space.type}</p>
                    <p>Capacity: {space.capacity}</p>
                    <p>Duration: {space.duration}</p>
                    <p>Opening Hours: {space.openingHours}</p>
                    <p>Accessibility: {space.accessibility ? 'Yes' : 'No'}</p>
                    <p>Maintenance: {space.maintenance ? 'Yes' : 'No'}</p>
                    <button className='detail-button' onClick={() => handleDetailClick(space._id)}>Details</button>
                    {/* Vous pouvez ajouter ici plus de détails si nécessaire */}
                </div>
            ))}
        </div>
    );
}

export default ZooSpaces;
