import React from "react";
import Logo from "./Logo";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const NotFound = () =>  (<>
    <Logo />
    <div className="not-found">
        <h1>Page not found</h1>
        <Link to={'/'}>
            <h2>Click to go to the home page</h2>
        </Link>
    </div>
    <Footer />
</>);

export default NotFound;