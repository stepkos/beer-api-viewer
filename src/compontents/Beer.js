import React from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Beer = ({ beer, toogleLike }) =>  (
    <li>
        <img 
            src={beer.image_url}
            alt="Beer image"
        />
        <h3>
            {beer.name}
            <div 
                style={{ "display": "inline-block", "position": "relative", "top": "4px" }}
                onClick={() => toogleLike(beer.id)}
            >
                { beer.is_liked ? <AiFillHeart /> : <AiOutlineHeart /> }
            </div>
        </h3>
        <h5>{beer.tagline}</h5>
        {beer.description.substring(0, 150)}...
    </li>
)

export default Beer;