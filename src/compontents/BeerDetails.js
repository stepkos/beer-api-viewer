import React, { useState, useEffect } from "react";
import defaultBeerImg from '../images/defaultBeer.png';
import { useParams } from 'react-router-dom';
import Logo from "./Logo";
import Footer from "./Footer";

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
        return;
    }

    return (<>

        <Logo />

        <div className="beer-details-wrapper">
            <div className="beer-details">

                <div className="img-div">
                    <img src={beer.image_url ? beer.image_url : defaultBeerImg} alt="Beer image" />
                </div>

                <div className="details-div">
                    <h1>{beer.name}</h1>
                    <h2>{beer.tagline}</h2>
                    
                    <p>{beer.description}</p>
                    
                    <h3>First brewed: <span className="not-bold">{beer.first_brewed}</span></h3>
                    <h3>Attenuation level: <span className="not-bold">{beer.attenuation_level}%</span></h3>
                    <h3>Food pairing: <span className="not-bold">{beer.food_pairing.join(', ')}</span></h3>
                    
                    <div className="coeffiecients">
                        {beer.abv ? <div className="coeffiecient">ABV: {beer.abv}</div> : <></>}
                        {beer.ibu ? <div className="coeffiecient">IBU: {beer.ibu}</div> : <></>}
                        {beer.ebc ? <div className="coeffiecient">EBC: {beer.ebc}</div> : <></>}
                        {beer.srm ? <div className="coeffiecient">SRM: {beer.srm}</div> : <></>}
                        {beer.ph ? <div className="coeffiecient">pH: {beer.ph}</div> : <></>}
                    </div>

                </div>

            </div>
        </div>

        <Footer />

    </>);
}

export default BeerDetails;
