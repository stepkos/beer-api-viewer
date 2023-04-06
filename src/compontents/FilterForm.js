import React from "react";

const FilterForm = ({ searchInput, setSearchInput }) =>  (
    <div className="filter-form">
        <form>
            <input 
                type="text" 
                value={searchInput}
                onChange={event => setSearchInput(event.target.value)}
                placeholder="Type to search" 
            /> 
        </form>
    </div>
)

export default FilterForm;