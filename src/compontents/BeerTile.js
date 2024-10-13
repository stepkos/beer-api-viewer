import React from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import defaultBeerImg from '../images/defaultBeer.png';
import { Link } from "react-router-dom";

const BeerTile = ({ beer, toogleLike }) =>  {
    
    const needBeSmaller = beer.name.length > 25 || beer.tagline.length > 40;
    const imagesApiUrl = 'http://images.beer.stepkowski.pl';

    return (
        <div className={`beer ${beer.is_liked ? 'liked' : ''}`}>
            
            <div className="like" onClick={() => toogleLike(beer.id)}>
                { beer.is_liked ? <AiFillHeart style={{"color": "#bf9000"}} /> : <AiOutlineHeart /> }
            </div>

            <Link to={`/beers/${beer.id}`}>
                <img
                    src={
                        beer.image_url ?
                        imagesApiUrl + beer.image_url.replace('https://images.punkapi.com', '')
                        : defaultBeerImg
                    } 
                    alt="Beer image" 
                />
            
                <h2 style={needBeSmaller ? {"marginTop": "10px", "marginBottom": "10px"} : {}}>{beer.name}</h2>
            
                <p style={needBeSmaller ? {"marginTop": 0} : {}}>{beer.tagline}</p>
            </Link>
        </div>
    );
}

export default BeerTile;