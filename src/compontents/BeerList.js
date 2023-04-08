import React from "react";
import Beer from "./Beer";

const BeerList = ({ beers, toogleLike }) => (
    <div className="beers-wrapper">
        <div className="beers">
            {beers.map(beer => (
                <Beer key={beer.id} beer={beer} toogleLike={toogleLike} />    
            ))}
        </div>
    </div>
);

export default BeerList;