import React from 'react';

const SearchBar = ({ searchInput, updateSearchInput, searchName }) => {
  return (
    <input
      key={`searchField-${searchName}`}
      value={searchInput}
      placeholder={`Search by ${searchName}`}
      onChange={(e) => updateSearchInput(e.target.value)}
    />
  );
};

export default SearchBar;
