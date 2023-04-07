import React, { useState, useEffect } from 'react';
import './App.css';
import BeerList from './compontents/BeerList';
import FilterForm from './compontents/FilterForm';

function App() {

    const [beers, setBeers] = useState([]);
    const [likedBeersId, setLikedBeersId] = useState(() => {
        const storedList = localStorage.getItem('likedBeersId');
        return storedList ? JSON.parse(storedList) : [];
    });
    const [searchInput, setSearchInput] = useState('');
    const [displayOnlyLiked, setDisplayOnlyLiked] = useState(false);
    
    const fetchAPI = async (url) => {
        const data = await fetch(url);
        const beerList = await data.json();
        
        // Add is_liked to beer object
        beerList.forEach(beer => beer.is_liked = likedBeersId.includes(beer.id));
        setBeers(beerList);
    };

    // Fetch beers from API
    useEffect(() => {
        fetchAPI("https://api.punkapi.com/v2/beers?page=1&per_page=50");
    }, []);

    // Update filteredBeers
    useEffect(() => {
        let url = new URL('https://api.punkapi.com/v2/beers');

        // Display only liked
        if (displayOnlyLiked)
            url.searchParams.set("ids", likedBeersId.join('|'));
    
        // Filter by name
        if (searchInput !== '')
            url.searchParams.set('beer_name', searchInput);

        // uri += '&page=1&per_page=50';
        console.log(url.href);
        fetchAPI(url.href);
    }, [searchInput, likedBeersId, displayOnlyLiked]);
    
    // Save likedBeersId to local storage
    useEffect(() => {
        localStorage.setItem('likedBeersId', JSON.stringify(likedBeersId));
    }, [likedBeersId])

    const toogleLike = id => {
        if (likedBeersId.includes(id))
            setLikedBeersId(likedBeersId.filter(el => el !== id));
        else
            setLikedBeersId([...likedBeersId, id]);
    }

    return (<>
        <FilterForm 
            searchInput={searchInput} 
            setSearchInput={setSearchInput} 
            displayOnlyLiked={displayOnlyLiked}
            setDisplayOnlyLiked={setDisplayOnlyLiked}
        />
        <BeerList beers={beers} toogleLike={toogleLike} />
    </>);
}

export default App;
