import React from "react";
import BeerTile from "./BeerTile";

const BeerList = ({ beers, toogleLike }) => (
    <div className="beers-wrapper">
        <div className="beers">
            {beers.map(beer => (
                <BeerTile key={beer.id} beer={beer} toogleLike={toogleLike} />    
            ))}
        </div>
    </div>
);

export default BeerList;