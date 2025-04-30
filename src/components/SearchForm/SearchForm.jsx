import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context.';
import './SearchForm.css';

const SearchForm = () => {
  const { setSearchTerm, setResultTitle, suggestions, fetchSuggestions } = useGlobalContext();
  const searchText = useRef('');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    searchText.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    if ((tempSearchTerm.replace(/[^\w\s]/gi, '')).length === 0) {
      setSearchTerm('the lost world');
      setResultTitle('Please Enter Something ...');
    } else {
      setSearchTerm(searchText.current.value);
    }
    navigate('/book');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value); // Fetch suggestions based on input value
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setInputValue(suggestion);
    navigate('/book');
  };

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input
                type="text"
                className='form-control'
                placeholder='The Lost World ...'
                ref={searchText}
                value={inputValue}
                onChange={handleInputChange}
              />
              <button type="submit" className='flex flex-c' onClick={handleSubmit}>
                <FaSearch className='text-purple' size={32} />
              </button>
            </div>
          </form>
          {/* Display suggestions */}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
