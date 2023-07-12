import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Animal as AnimalModel } from "../Models/animal";
import './AnimalDetail.css';
import './AnimalBox.css'

interface RouteParams {
    id: string;
}





const AnimalDetail: React.FC = () => {
    const { id } = useParams<Record<string, string>>();
    const [animal, setAnimal] = useState<AnimalModel | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [treatment, setTreatment] = useState('');
    const [veterinarian, setVeterinarian] = useState('');
    const [date, setDate] = useState('');

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!date || !treatment || !veterinarian) {
            alert("All fields are required!");
            return;
        }

        // Ensure `animal` is not null before accessing `animal.treatmentRecords`
        const previousRecords = animal ? animal.treatmentRecords : [];

        const updatedRecords = {
            "treatmentRecords": [
                ...previousRecords,
                {
                    "date": date,
                    "treatment": treatment,
                    "veterinarian": veterinarian
                }
            ]
        };

        if (animal) {
            fetch(`http://localhost:3000/animals/${animal._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRecords),
            })
                .then(response => response.json())
                .then(data => {
                    // Update the animal state with the new data from the server
                    setAnimal(data);
                    setEditMode(false);
                    // Reset form fields
                    setDate('');
                    setTreatment('');
                    setVeterinarian('');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }



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
                <div className="animalBoxButton">
                    <button onClick={handleEdit}>Edit</button>
                </div>
            </div>
            {editMode && (
                <form className="animal-detail-form" onSubmit={handleSave}>
                    <label className="animal-detail-label">
                        Date:
                        <input className="animal-detail-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </label>
                    <label className="animal-detail-label">
                        Treatment:
                        <input className="animal-detail-input" type="text" value={treatment} onChange={(e) => setTreatment(e.target.value)} />
                    </label>
                    <label className="animal-detail-label">
                        Veterinarian:
                        <input className="animal-detail-input" type="text" value={veterinarian} onChange={(e) => setVeterinarian(e.target.value)} />
                    </label>
                    <button className="animal-detail-button submit" type="submit">Save</button>
                    <button className="animal-detail-button cancel" type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            )}

        </div>
    );
}

export default AnimalDetail;
