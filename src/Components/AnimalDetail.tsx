import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Animal as AnimalModel } from "../Models/animal";
import './AnimalDetail.css';

interface RouteParams {
    id: string;
}

const AnimalDetail: React.FC = () => {
    const { id } = useParams<Record<string, string>>();
    const [animal, setAnimal] = useState<AnimalModel | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3000/animals/${id}`)
            .then(response => response.json())
            .then(data => setAnimal(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    if (!animal) {
        return <div>Loading...</div>;
    }

    return (
        <div className="animal-detail">
            <div className="animal-detail-column">
                <h2>{animal.name}</h2>
                <p>{animal.species}</p>
                <p>{animal.description}</p>
                <img className="animal-detail-image" src= "https://via.placeholder.com/150"/>
            </div>
            <div className="animal-detail-column">
                <h2>Treatment Records:</h2>
                {animal.treatmentRecords.length > 0 ? (
                    <ul className="treatment-records">
                        {animal.treatmentRecords.map((record, i) => (
                            <li key={i} className="treatment-record">
                                <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
                                <p><strong>Treatment:</strong> {record.treatment}</p>
                                <p><strong>Veterinarian:</strong> {record.veterinarian}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="treatment-record-empty">No treatment records yet.</p>
                )}
            </div>
        </div>
    );
}

export default AnimalDetail;
