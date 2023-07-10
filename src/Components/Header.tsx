import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importez le composant Link depuis 'react-router-dom'
import './Header.css'; // importez votre fichier css
import AuthModal from './AuthModal';

type HeaderProps = {
    onAuthClick: () => void; // cette fonction sera appelée lorsque le bouton d'authentification sera cliqué
};

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleAuthClick = () => {
        setIsAuthModalOpen(true);
    };

    const handleAuthModalClose = () => {
        setIsAuthModalOpen(false);
    };

    return (
        <header>
            <div className="header-top">
                <Link to="/">
                    <img src="logo.png" alt="Logo" className="logo" />
                </Link>
                <h1>Planode ZOO</h1>
                <button className='button type1' onClick={handleAuthClick}>
                    <span className="btn-txt">Authentication</span>
                </button>
                <AuthModal isOpen={isAuthModalOpen} onRequestClose={handleAuthModalClose} />
            </div>

            <nav className="navbar">
                <a href="/section1">Section 1</a>
                <a href="/section2">Section 2</a>
                <a href="/section3">Section 3</a>
                <a href="/section4">Section 4</a>
            </nav>
        </header>
    );
}

export default Header;
