import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Catalog from './compontents/Catalog';
import BeerDetails from './compontents/BeerDetails';
import NotFound from './compontents/NotFound';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Catalog />} />
            <Route path='/beers' element={<Catalog />} />
            <Route path='/beers/:id' element={<BeerDetails />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
