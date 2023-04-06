import React, { useState, useEffect } from "react";
import Beer from "./Beer";

const BeerList = () => {

    const [beers, setBeers] = useState([]);
    
    // Fetch beers from API
    useEffect(() => {
        const fetchAPI = async () => {
          const data = await fetch("https://api.punkapi.com/v2/beers");
          const beerList = await data.json();
          setBeers(beerList);
        };
        fetchAPI();
    }, []);
    
    return (
        <div className="beer-div">
            <ul className="beer-list">
                {beers.map(beer => (
                    <Beer key={beer.id} beer={beer} />    
                ))};
            </ul>
        </div>
    );

}

export default BeerList;