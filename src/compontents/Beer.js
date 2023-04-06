import React from "react";

const Beer = ({ beer }) =>  (
    <li>
        <h3>{beer.name}</h3>
        <h5>{beer.tagline}</h5>
        {beer.description.substring(0, 150)}...
    </li>
)

export default Beer;