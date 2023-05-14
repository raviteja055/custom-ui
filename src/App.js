import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductListing from './produtListing';
import ProductDetailsPage from "./prodcutDetailPage"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
