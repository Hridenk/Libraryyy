import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../images/logo.png';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { BsSun, BsMoon } from 'react-icons/bs'; // Import icons for light and dark mode

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleNavbar = () => setToggleMenu(!toggleMenu);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  useEffect(() => {
    // Check for saved dark mode preference in local storage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
      document.body.classList.toggle('dark-mode', JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    // Save dark mode preference to local storage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`} id="navbar">
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link to="/" className='navbar-brand flex' aria-label="Home">
            <img src={logoImg} alt="site logo" />
            <span className='text-uppercase fw-7 fs-24 ls-1'>bookhub</span>
          </Link>
          <button
            type="button"
            className='navbar-toggler-btn'
            onClick={handleNavbar}
            aria-label="Toggle Menu"
          >
            <HiOutlineMenuAlt3
              size={35}
              style={{
                color: toggleMenu ? '#fff' : '#010101',
              }}
            />
          </button>
        </div>
        <div className={toggleMenu ? 'navbar-collapse show-navbar-collapse' : 'navbar-collapse'}>
          <ul className="navbar-nav">
            <li className='nav-item'>
              <Link to="book" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="about" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <button
                type="button"
                className='nav-link text-uppercase fs-22 fw-6 ls-1'
                onClick={toggleDarkMode}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <BsSun size={24} /> : <BsMoon size={24} />}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
