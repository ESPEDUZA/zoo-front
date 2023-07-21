import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import ZooSpaces from "./Components/ZooSpaces";
import SpaceDetail from "./Components/SpaceDetail";
import AnimalDetail from "./Components/AnimalDetail";
import About from "./Components/About";
import Account from "./Components/Account";
import TicketManagement from "./Components/TicketManagement";
import Zoo from "./Components/Zoo";

function App() {
  const handleAuthClick = () => {
    // Here you can handle what should happen when the authentication button is clicked
    console.log("Authentication button clicked");
  };

  return (
    <Router>
      <Header onAuthClick={handleAuthClick} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spaces" element={<ZooSpaces />} />
        <Route path="/spaces/:id" element={<SpaceDetail />} />
        <Route path="/animals/:id" element={<AnimalDetail />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/About" element={<About />} />
        <Route path="/TicketManagement" element={<TicketManagement />} />
        <Route path="/Zoo" element={<Zoo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
