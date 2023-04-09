import React from "react";
import { Link } from "react-router-dom";
import logoImg from '../images/logo.jpg';

const Logo = () => (
    <div className="filter-form-wrapper">

        <Link to={'/'}>
            <img className="tmp" src={logoImg} alt="Logo" />
        </Link>

        <div className="symulate-form-size"></div>
        
    </div>
);

export default Logo;