import React from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from "react-router-dom";
import logoImg from '../images/logo.jpg';

const FilterForm = ({ searchInput, setSearchInput, displayOnlyLiked, setDisplayOnlyLiked }) => (
    <div className="filter-form-wrapper">

        <Link to={'/'}>
            <img className="tmp" src={logoImg} alt="Logo" />
        </Link>

        <form>

            <input 
                type="text" 
                value={searchInput}
                onChange={event => setSearchInput(event.target.value)}
                placeholder="Search" 
            />

            <label>

                <span className="displayLikedText">Only liked</span>

                <span className="displayLikedIcon">
                    { displayOnlyLiked ? <AiFillHeart style={{"color": "#bf9000"}} /> : <AiOutlineHeart /> }
                </span>

                <input 
                    type="checkbox" 
                    value={displayOnlyLiked}
                    onChange={event => setDisplayOnlyLiked(event.target.checked)}
                />

            </label>

        </form>
    </div>
)

export default FilterForm;