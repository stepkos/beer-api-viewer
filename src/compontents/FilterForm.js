import React from "react";

const FilterForm = ({ searchInput, setSearchInput, displayOnlyLiked, setDisplayOnlyLiked }) =>  (
    <div className="filter-form">
        <form>
            <input 
                type="text" 
                value={searchInput}
                onChange={event => setSearchInput(event.target.value)}
                placeholder="Type to search" 
            /> 
            <label>
                <span style={{"paddingLeft": "10px"}}>Only liked</span>
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