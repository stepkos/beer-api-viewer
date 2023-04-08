import React from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Beer = ({ beer, toogleLike }) =>  {
    
    const needBeSmaller = beer.name.length > 25 || beer.tagline.length > 40;

    return (
        <div className="beer">
            
            <div className="like" onClick={() => toogleLike(beer.id)}>
                { beer.is_liked ? <AiFillHeart /> : <AiOutlineHeart /> }
            </div>

            <img src={beer.image_url} alt="Beer image" />

            <h2 style={needBeSmaller ? {"marginTop": "10px", "marginBottom": "10px"} : {}}>{beer.name}</h2>

            <p style={needBeSmaller ? {"marginTop": 0} : {}}>{beer.tagline}</p>

        </div>
    );
}

export default Beer;