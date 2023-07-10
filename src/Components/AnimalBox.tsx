import React from 'react';
import {Animal as AnimalModel} from "../Models/animal";


interface AnimalProps {
    animal: AnimalModel;
}

const AnimalBox: React.FC<AnimalProps> = ({ animal }) => {
    return (
        <div>
            <h2>{animal.name}</h2>
            <p>{animal.species}</p>
            <img src={`${animal.name}.jpg`} alt={animal.name} />
        </div>
    );
};

export default AnimalBox;
