// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CreateNewPage from './pages/CreateNewPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="#" element={<SearchPage />} />
          <Route path="/create" element={<CreateNewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
