import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from "./Components/HomePage";
import ZooSpaces from "./Components/ZooSpaces";
import SpaceDetail from "./Components/SpaceDetail";
import AnimalDetail from "./Components/AnimalDetail";

function App() {
    const handleAuthClick = () => {
        // Here you can handle what should happen when the authentication button is clicked
        console.log('Authentication button clicked');
    };

    return (
        <Router>
            <Header onAuthClick={handleAuthClick} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/spaces" element={<ZooSpaces/>}/>
                <Route path="/spaces/:id" element={<SpaceDetail />}/>
                <Route path="/animals/:id" element={<AnimalDetail />} />
            </Routes>

            <Footer />
        </Router>
    );
}

export default App;

