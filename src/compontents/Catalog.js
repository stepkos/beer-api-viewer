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
    const [pageNumber, setPageNumber] = useState(1);
    // const [isLoading, setIsLoading] = useState(false);
    
    // const pixelsOffsetToLoadNewData = 100;
    const scrollBeersPortion = 20;
    const baseUrl = 'https://api.punkapi.com/v2/beers';

    const fetchAPI = async (url, isFirstPage) => {
        url.searchParams.set('page', isFirstPage ? 1 : pageNumber);
        url.searchParams.set('per_page', scrollBeersPortion);
        
        console.log(url.toString());
        const data = await fetch(url);
        const beerList = await data.json();
        
        // Add is_liked to beer object
        beerList.forEach(beer => beer.is_liked = likedBeersId.includes(beer.id));
        
        if (isFirstPage) {
            await setBeers(beerList);
            setPageNumber(2);
        }
        else {
            await setBeers([...beers, ...beerList]);
            setPageNumber(pageNumber + 1);
        }
    };

    const fetchWrapper = (isFirstPage) => {
        // To clean up parameters
        let url = new URL(baseUrl);
        console.log('display only liked ' + displayOnlyLiked)
        // Display only liked
        if (displayOnlyLiked)
            url.searchParams.set("ids", likedBeersId.join('|'));
        
        // Filter by name
        if (searchInput !== '')
            url.searchParams.set('beer_name', searchInput.replace(' ', '_'));

        fetchAPI(url, isFirstPage);
    }

    // Update beersQuery
    useEffect(() => {
        fetchWrapper(true);
    }, [searchInput, displayOnlyLiked]);

    useEffect(() => {
        console.log(displayOnlyLiked);
    }, [displayOnlyLiked])
    
    // Save likedBeersId to local storage
    useEffect(() => {
        localStorage.setItem('likedBeersId', JSON.stringify(likedBeersId));
        setBeers(prevBeers => {
            return prevBeers.map(beer => {
              beer.is_liked = likedBeersId.includes(beer.id);
              return beer;
            });
        });

    }, [likedBeersId])
    
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            const windowBottom = windowHeight + window.pageYOffset;

            if (windowBottom >= docHeight) {
                console.log('load new beers')
                fetchWrapper(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, [pageNumber]);

    const toogleLike = id => {
        console.log("toogle")
        if (likedBeersId.includes(id))
            setLikedBeersId(likedBeersId.filter(el => el !== id));
        else
            setLikedBeersId([...likedBeersId, id]);
    }

    if (!beers)
        return;

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
