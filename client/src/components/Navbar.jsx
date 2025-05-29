import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo1.jpeg";
import { Link } from "react-router-dom";






const Navbar = ({ 
  brandName = "EchoBoard", 
  navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/admin", label: "Admin Login" }
  ],
  onNavClick 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNavClick = (href, label) => {
    setIsMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(href, label);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="logo-section">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-icon" />
        </div>
        <h1 className="brand-name">{brandName}</h1>
      </div>
      <nav className={`navigation ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="nav-link"
            onClick={() => handleNavClick(item.href, item.label)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div 
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      >
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
    </header>
  );
};

export default Navbar;
