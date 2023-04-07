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

    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const pixelsOffsetToLoadNewData = 500;
    const scrollBeersPortion = 20;
    const baseUrl = 'https://api.punkapi.com/v2/beers';
    var APIUrl = new URL(baseUrl);


    const fetchAPI = async () => {
        await setIsLoading(true);
        APIUrl.searchParams.set('page', pageNumber);
        APIUrl.searchParams.set('per_page', scrollBeersPortion);
        
        const data = await fetch(APIUrl);
        const beerList = await data.json();
        
        // Add is_liked to beer object
        beerList.forEach(beer => beer.is_liked = likedBeersId.includes(beer.id));
        
        console.log('tutaj');
        
        if (pageNumber == 1)
            setBeers(beerList);
        else
            setBeers([...beers, ...beerList]);
        
        await setPageNumber(pageNumber + 1);
        await setIsLoading(false);
    };

    // Call when App starts
    useEffect(() => {
        // fetchAPI(APIUrl);

        window.addEventListener('scroll', () => {
            const currentScrollValue = window.innerHeight + window.scrollY; 
            const loadNewDataThreshold = document.body.offsetHeight - pixelsOffsetToLoadNewData; 
            if (currentScrollValue > loadNewDataThreshold && !isLoading) {
                console.log("load new data");
                fetchAPI();
            }
        })
    }, [])

    // Update beersQuery
    useEffect(() => {
        // To clean parameters
        APIUrl = new URL(baseUrl);
        setPageNumber(1);

        // Display only liked
        if (displayOnlyLiked)
            APIUrl.searchParams.set("ids", likedBeersId.join('|'));
    
        // Filter by name
        if (searchInput !== '')
            APIUrl.searchParams.set('beer_name', searchInput);

        console.log(APIUrl);
        fetchAPI();
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
