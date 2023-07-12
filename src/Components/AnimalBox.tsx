import React from 'react';
import {Animal as AnimalModel} from "../Models/animal";
import './AnimalBox.css'
import { Link } from 'react-router-dom';

interface AnimalProps {
    animal: AnimalModel;
}

const AnimalBox: React.FC<AnimalProps> = ({ animal }) => {
    return (
        <div className="AnimalBox">
            <div className="animalBoxText">
                <h2>{animal.name}</h2>
                <p>{animal.species}</p>
            </div>
            <div className="animalBoxImage">
                <img src= "https://via.placeholder.com/150" />
            </div>
            <div className="animalBoxButton">
                <Link to={`/animals/${animal._id}`}>
                    <button>Details</button>
                </Link>
            </div>
        </div>
    );
};

export default AnimalBox;
