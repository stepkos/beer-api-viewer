import React from "react";
import { AiFillGithub, AiOutlineInstagram } from 'react-icons/ai';

const Footer = () => (
    <div className="footer-wrapper">

        <div>
            <h2>Created by Jakub Stępkowski</h2>
        </div>

        <div>
            <a href="https://github.com/stepkos">
                <AiFillGithub />
            </a>

            <a href="https://www.instagram.com/stepkos/">
                <AiOutlineInstagram />
            </a>
        </div>

    </div>
);

export default Footer;