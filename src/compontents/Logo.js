import React from "react";
import { Link } from "react-router-dom";
import logoImg from '../images/logo.jpg';

const Logo = () => (
    <div className="filter-form-wrapper">

        <Link to={'/'}>
            <img className="tmp" src={logoImg} alt="Logo" />
        </Link>

        <div className="simulate-form-size">
            {/* <cite>"Beers of your dreams"</cite> */}
        </div>
        
    </div>
);

export default Logo;