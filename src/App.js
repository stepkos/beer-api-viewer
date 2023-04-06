import React, { useState, useEffect } from 'react';
import './App.css';
import BeerList from './compontents/BeerList';
import FilterForm from './compontents/FilterForm';

function App() {

    const [beers, setBeers] = useState([]);
    const [filteredBeers, setFilteredBeers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    
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
        if (searchInput !== '')
            setFilteredBeers(beers.filter(beer => 
                beer.name.toLowerCase().includes(searchInput)));
        else
            setFilteredBeers(beers);
    }, [beers, searchInput]);
    
    
    return (<>
        <FilterForm searchInput={searchInput} setSearchInput={setSearchInput} />
        <BeerList beers={filteredBeers} />
    </>);
}

export default App;
