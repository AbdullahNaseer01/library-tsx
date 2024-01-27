import React, { useState } from 'react';
import logo from "../assets/logo.svg";
import hamBurger from "../assets/hamBurger.svg";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isLandingsDropdownOpen, setLandingsDropdownOpen] = useState<boolean>(false);
  const [isDocsDropdownOpen, setDocsDropdownOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleLandingsDropdown = (): void => {
    setLandingsDropdownOpen(!isLandingsDropdownOpen);
  };

  const toggleDocsDropdown = (): void => {
    setDocsDropdownOpen(!isDocsDropdownOpen);
  };

  const closeDropdowns = (): void => {
    setLandingsDropdownOpen(false);
    setDocsDropdownOpen(false);
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center mt-6 text-customTextColour font-semibold text-base">
      <div className="flex justify-between md:flex w-full">
        {/* Logo */}
        <Link to='/'>
        <img src={logo} alt="Logo" className="mr-4" />
        </Link>
        {/* Hamburger button for small screens */}
        <button className="md:hidden" onClick={toggleMenu}>
          <img src={hamBurger} alt="Logo" className="mr-4" />
        </button>
      </div>
      {/* Menu for larger screens or when the menu is open on small screens */}
      <div
        className={`${isMenuOpen ? 'flex flex-col' : 'hidden'
          } md:flex md:flex-row md:space-x-12 mt-3 md:mt-0 transition-all ease-in-out duration-300`}
        onClick={closeDropdowns}
      >
        <Link to="/">Home</Link>
        {/* Landings Dropdown */}
        <div
          className="relative group"
          onMouseEnter={toggleLandingsDropdown}
          onMouseLeave={closeDropdowns}
        >
          <button className="flex items-center">
            Landings
            <span className="ml-2">
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.95927 6.38318L8.67801 2.66444C8.93505 2.41015 8.93505 1.99452 8.67801 1.7375L8.06005 1.11952C7.80576 0.862504 7.39013 0.862504 7.13309 1.11952L4.49718 3.75546L1.86123 1.11952C1.60694 0.862504 1.19131 0.862504 0.934273 1.11952L0.316316 1.7375C0.0592748 1.99179 0.0592748 2.40742 0.316316 2.66444L4.03506 6.38318C4.2921 6.64022 4.7077 6.64022 4.95927 6.38318Z" fill="#183B56" />
              </svg>
            </span>
          </button>
          {/* Dropdown Content */}
          {isLandingsDropdownOpen && (
            <div className="absolute hidden md:block mt-2 space-y-2 bg-white border border-gray-200 rounded-md">
              <a href="/landing1">Landing 1</a>
              <a href="/landing2">Landing 2</a>
              {/* Add more items as needed */}
            </div>
          )}
        </div>
        {/* Docs Dropdown */}
        <div
          className="relative group"
          onMouseEnter={toggleDocsDropdown}
          onMouseLeave={closeDropdowns}
        >
          <button className="flex items-center">
            pages
            <span className="ml-2">
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.95927 6.38318L8.67801 2.66444C8.93505 2.41015 8.93505 1.99452 8.67801 1.7375L8.06005 1.11952C7.80576 0.862504 7.39013 0.862504 7.13309 1.11952L4.49718 3.75546L1.86123 1.11952C1.60694 0.862504 1.19131 0.862504 0.934273 1.11952L0.316316 1.7375C0.0592748 1.99179 0.0592748 2.40742 0.316316 2.66444L4.03506 6.38318C4.2921 6.64022 4.7077 6.64022 4.95927 6.38318Z" fill="#183B56" />
              </svg>
            </span>
          </button>
          {/* Dropdown Content */}
          {isDocsDropdownOpen && (
            <div className="absolute hidden md:block mt-2 space-y-2 bg-white border border-gray-200 rounded-md">
              <a href="/docs1">Docs 1</a>
              <a href="/docs2">Docs 2</a>
              {/* Add more items as needed */}
            </div>
          )}
        </div>
        <Link to="/">Docs</Link>
        <Link to="/bookdetails">Help</Link>
        <Link to='/search' className="border-2 border-linkColour text-linkColour px-6 py-1 rounded-md">
          Search
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


