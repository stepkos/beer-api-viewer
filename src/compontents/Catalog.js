import React, { useState, useEffect } from 'react';
import BeerList from './BeerList';
import LogoWithForm from './LogoWithForm';
import Footer from './Footer';

const Catalog = () => {

    const [beers, setBeers] = useState([]);
    const [likedBeersId, setLikedBeersId] = useState(() => {
        const storedList = localStorage.getItem('likedBeersId');
        return storedList ? JSON.parse(storedList) : [];
    });
    const [searchInput, setSearchInput] = useState('');
    const [displayOnlyLiked, setDisplayOnlyLiked] = useState(false);
    // const [pageNumber, setPageNumber] = useState(1);
    // const [isLoading, setIsLoading] = useState(false);
    
    // const pixelsOffsetToLoadNewData = 100;
    const scrollBeersPortion = 20;
    const baseUrl = 'https://api.punkapi.com/v2/beers';

    const fetchAPI = async (url, page=1) => {
        url.searchParams.set('page', page);
        url.searchParams.set('per_page', scrollBeersPortion);
        
        console.log(url.toString());
        const data = await fetch(url);
        const beerList = await data.json();
        
        // Add is_liked to beer object
        beerList.forEach(beer => beer.is_liked = likedBeersId.includes(beer.id));
        
        if (page === 1)
            await setBeers(beerList);
        else
            await setBeers([...beers, ...beerList]);
    };

    // Call when App starts
    // useEffect(() => {
    //     window.addEventListener('scroll', async () => {
    //             const currentScrollValue = window.innerHeight + window.scrollY; 
    //             const loadNewDataThreshold = document.body.offsetHeight - pixelsOffsetToLoadNewData; 
    //             if (currentScrollValue > loadNewDataThreshold && !isLoading) {
    //                 console.log('add new data');
    //                 await setIsLoading(prevValue => !prevValue);
    //                 await setPageNumber(prevPageNumber => prevPageNumber + 1);
    //             }
    //     });
    // }, [])

    // useEffect(() => {
    //     const wrapper = async () => {
    //         await fetchAPI();
    //         setIsLoading(false);
    //     }
    //     wrapper();
    // }, [pageNumber]);

    // Update beersQuery
    useEffect(() => {

        // To clean up parameters
        let url = new URL(baseUrl);
        
        // Display only liked
        if (displayOnlyLiked)
            url.searchParams.set("ids", likedBeersId.join('|'));
        
        // Filter by name
        if (searchInput !== '')
            url.searchParams.set('beer_name', searchInput.replace(' ', '_'));

        fetchAPI(url, 1);

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
        <LogoWithForm
            searchInput={searchInput} 
            setSearchInput={setSearchInput} 
            displayOnlyLiked={displayOnlyLiked}
            setDisplayOnlyLiked={setDisplayOnlyLiked}
        />
        <BeerList beers={beers} toogleLike={toogleLike} />
        <Footer />
    </>);
}

export default Catalog;
