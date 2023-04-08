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
    const scrollBeersPortion = 5;
    const baseUrl = 'https://api.punkapi.com/v2/beers';
    const [APIUrl, setAPIUrl] = useState(new URL(baseUrl));

    const fetchAPI = async () => {
        APIUrl.searchParams.set('page', pageNumber);
        APIUrl.searchParams.set('per_page', scrollBeersPortion);
        
        console.log(APIUrl.toString());
        const data = await fetch(APIUrl);
        const beerList = await data.json();
        
        // Add is_liked to beer object
        beerList.forEach(beer => beer.is_liked = likedBeersId.includes(beer.id));
        
        if (pageNumber == 1)
            await setBeers(beerList);
        else
            await setBeers([...beers, ...beerList]);
    };

    // Call when App starts
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const wrapper = async () => {
                const currentScrollValue = window.innerHeight + window.scrollY; 
                const loadNewDataThreshold = document.body.offsetHeight - pixelsOffsetToLoadNewData; 
                if (currentScrollValue > loadNewDataThreshold && !isLoading) {
                    console.log('add new data');
                    await setIsLoading(prevValue => !prevValue);
                    await setPageNumber(prevPageNumber => prevPageNumber + 1);
                }
            }
            wrapper();
        })
    }, [])

    useEffect(() => {
        const wrapper = async () => {
            await fetchAPI();
            setIsLoading(false);
        }
        wrapper();
    }, [pageNumber]);

    // Update beersQuery
    useEffect(() => {

        // To clean up parameters
        // APIUrl = new URL(baseUrl);
        setAPIUrl(new URL(baseUrl));
        
        // Display only liked
        if (displayOnlyLiked)
            APIUrl.searchParams.set("ids", likedBeersId.join('|'));
        
        // Filter by name
        if (searchInput !== '')
            APIUrl.searchParams.set('beer_name', searchInput.replace(' ', '_'));
        
        setPageNumber(1);
        fetchAPI();
        // zobacz czy zmiana z page number 1 na 1 wywoluje useEffect
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
