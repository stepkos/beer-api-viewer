import React, { useState, useEffect } from "react";
import Beer from "./Beer";

const BeerList = ({ beers }) => {
    
    return (
        <div className="beer-div">
            <ul className="beer-list">
                {beers.map(beer => (
                    <Beer key={beer.id} beer={beer} />    
                ))}
            </ul>
        </div>
    );

}

export default BeerList;