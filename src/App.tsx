import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from "./Components/HomePage";

function App() {
    const handleAuthClick = () => {
        // Ici vous pouvez gérer ce qui doit se passer lorsque le bouton d'authentification est cliqué
        console.log('Bouton d\'authentification cliqué');
    };

    return (
        <Router>
            <Header onAuthClick={handleAuthClick} />
            <Routes>
                {/* Ajoutez ici les autres routes */}
                <Route path="/" element={<HomePage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
