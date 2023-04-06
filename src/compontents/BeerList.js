import React, { useState, useEffect } from "react";

const BeerList = () => {
    const [beers, setBeers] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
          const data = await fetch(
            "https://api.punkapi.com/v2/beers?page=1&per_page=10"
          );
          const beerList = await data.json();
          setBeers(beerList);
        };
        fetchAPI();
      }, []);
    
      return (
        <div>
          <ul>
            {beers.map(beer => (
              <li key={beer.id}>
                <h3>{beer.name}</h3>
                {beer.description.substring(0, 150)}...
              </li>
            ))}
          </ul>
        </div>
      );

}

export default BeerList;