import React, { useState, useEffect } from "react";
import defaultBeerImg from '../images/defaultBeer.png';
import { useParams } from 'react-router-dom';

const BeerDetails = () =>  {
    const { id } = useParams()
    const [beer, setBeer] = useState();

    useEffect(() => {
        const fetchBeer = async () => {
            try {
                const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
                const data = await response.json();
                setBeer(data[0]);
            } catch (error) {
                console.error(error);
                return <h1>Something was wrong</h1>
            }
        };
        fetchBeer();
    }, [id]);

    if (!beer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="beer-details-wrapper">
            
            <div className="beer-details">
                <div className="img-div">
                    <img src={beer.image_url ? beer.image_url : defaultBeerImg} alt="Beer image" />
                </div>

                <div className="details-div">
                    <h1>{beer.name}</h1>
                    <h3>{beer.tagline}</h3>
                    <h3>First brewed: {beer.first_brewed}</h3>
                    <p>{beer.description}</p>
                    
                    <h5>abv: {beer.abv}</h5>
                    <h5>ibu: {beer.ibu}</h5>
                    <h5>ebc: {beer.ebc}</h5>
                    <h5>srm: {beer.srm}</h5>
                    <h5>ph: {beer.ph}</h5>
                    <h5>Attenuation level: {beer.attenuation_level}</h5>
                    <h5>Food pairing: {beer.food_pairing.join(', ')}</h5>
                </div>

            </div>


        </div>
    );
}

export default BeerDetails;
