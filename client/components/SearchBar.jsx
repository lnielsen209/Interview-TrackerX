import React from 'react';

const SearchBar = ({ searchInput, updateSearchInput, updateCategoryInput }) => {
  return (
    <div className={'searchBar'}>
      <input
        key={`searchField`}
        value={searchInput}
        placeholder={`Search...`}
        onChange={(e) => updateSearchInput(e.target.value)}
      />
      <select
        className="searchDropDown"
        onChange={(e) => updateCategoryInput(e.target.value)}
      >
        <option value={'company'}>Company Name</option>
        <option value={'job_title'}>Title</option>
        <option value={'location'}>Location</option>
        <option value={'notes'}>Notes</option>
        <option value={'app_status'}>App Status</option>
      </select>
    </div>
  );
};

export default SearchBar;
