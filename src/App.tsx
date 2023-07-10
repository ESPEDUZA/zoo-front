import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from "./Components/HomePage";
import ZooSpaces from "./Components/ZooSpaces";
import SpaceDetail from "./Components/SpaceDetail";

function App() {
    const handleAuthClick = () => {
        // Ici vous pouvez gérer ce qui doit se passer lorsque le bouton d'authentification est cliqué
        console.log('Bouton d\'authentification cliqué');
    };

    return (
        <Router>
            <Header onAuthClick={handleAuthClick} />
            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/spaces" element={<ZooSpaces/>}/>
                <Route path="/spaces/:id" element={<SpaceDetail />}/>

            </Routes>

            <Footer />
        </Router>
    );
}

export default App;
