import React, { useState, useEffect } from 'react';
import './App.css';
import BeerList from './compontents/BeerList';

function App() {

    const [beers, setBeers] = useState([]);
    const [filteredBeers, setFilteredBeers] = useState([]);
    
    // Fetch beers from API
    useEffect(() => {
        const fetchAPI = async () => {
          const data = await fetch("https://api.punkapi.com/v2/beers");
          const beerList = await data.json();
          setBeers(beerList);
        };
        fetchAPI();
    }, []);

    // Update filteredBeers
    useEffect(() => {
        setFilteredBeers(beers)
    }, [beers]);
    


    return (
        <BeerList beers={filteredBeers} />
    );
}

export default App;
