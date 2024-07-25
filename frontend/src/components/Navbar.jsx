import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = () => {
  const [menuClick, setMenuClick] = useState(false);
  const location = useLocation(); // Get the current location

  const [profileDropdown, setProfileDropdown] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const handleMenuClick = () => {
    setMenuClick(!menuClick);
  };

  const isHomePage = location.pathname === "/";

  const menuContent = (
    <div className="menu-items bg-white w-full h-[100vh] flex flex-col z-[20] lg:gap-5 justify-start items-start absolute top-[9vh] right-0 border-b-2 border-slate-600 rounded-b-xl animate-slideDown">
      <ul className="text-center text-2xl text-customBlue cursor-pointer w-full px-20">
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-tomato hover:text-white hover:rounded-2xl">
          <Link onClick={() => setMenuClick(false)} className="w-full" to="/">
            Home
          </Link>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-tomato hover:text-white hover:rounded-2xl">
          <Link
            onClick={() => setMenuClick(false)}
            className="w-full flex gap-2 justify-center items-center"
            to="/cart"
          >
            My Cart{" "}
            {getTotalCartAmount() > 0 && (
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            )}
          </Link>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-tomato hover:text-white hover:rounded-2xl">
          <Link
            onClick={() => setMenuClick(false)}
            className="w-full"
            to="/orders"
          >
            My Orders
          </Link>
        </li>
        {isHomePage && (
          <>
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-tomato hover:text-white hover:rounded-2xl">
              <a
                onClick={() => setMenuClick(false)}
                className="w-full"
                href="#explore-menu"
              >
                Explore Menu
              </a>
            </li>
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-tomato hover:text-white hover:rounded-2xl">
              <a
                onClick={() => setMenuClick(false)}
                className="w-full"
                href="#app-download"
              >
                App Download
              </a>
            </li>
            <li className="my-4 py-4 hover:bg-tomato hover:text-white hover:rounded-2xl">
              <a
                onClick={() => setMenuClick(false)}
                className="w-full"
                href="/contact-us"
              >
                Contact Us
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token"); // Ensure the token is removed from local storage
  };

  return (
    <div className="navbar w-full sm:w-[90vw] top-0 bg-white fixed z-10 h-[10vh] p-3 text-outfit font-medium flex justify-between items-center lg:p-5 md:p-3 sm:p-2">
      {/* Logo Image */}
      <div className="logo flex-shrink-0 justify-start w-[100px] lg:w-[170px] sm:w-[120px]">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="w-full" />
        </Link>
      </div>

      {isHomePage && (
        <>
          {/* Navbar Items */}
          <div className="navbar-items hidden w-3/5 max-w-[1000px] lg:flex lg:justify-end text-customBlue text-lg lg:text-lg md:text-sm lg:gap-3">
            <ul className="flex w-full justify-evenly items-center cursor-pointer">
              <li className="text-center hover:underline">
                <a href="#">home</a>
              </li>
              <li className="text-center hover:underline">
                <a href="#explore-menu">explore-menu</a>
              </li>
              <li className="text-center hover:underline">
                <a href="#app-download">app-download</a>
              </li>
              <li className="text-center hover:underline">
                <a href="#contact-us">contact-us</a>
              </li>
            </ul>
          </div>

          {/* Navbar Tools */}
          <div className="navbar-tools hidden lg:flex md:flex md:flex-1 sm:flex justify-center items-center gap-2 mx-1">
            <div className="navbar-search-icon relative mx-1 w-10 shrink-0">
              <Link to="">
                <img
                  src={assets.search_icon}
                  alt="Search"
                  className="cursor-pointer w-10 md:w-5"
                />
              </Link>
            </div>

            <div className="navbar-cart-icon relative w-10 shrink-0">
              <Link to="/cart">
                <img
                  src={assets.basket_icon}
                  alt="Cart"
                  className="cursor-pointer w-10 md:w-5"
                />
              </Link>
              <div
                className={
                  getTotalCartAmount() > 0
                    ? "dot absolute bg-tomato rounded-full min-w-[10px] min-h-[10px] -top-1 right-[-0.1px]"
                    : ""
                }
              ></div>
            </div>
          </div>
        </>
      )}

      <div className="right-side-navbar flex items-center justify-between gap-2">
        {!token ? (
          <>
            {/* Login Button */}
            <p>
              <a
                href="/login"
                className="text-base sm:text-lg hover:text-tomato"
              >
                Login
              </a>
            </p>
            {/* Signup Button */}
            <div className="signup mx-1 justify-end md:mx-3 sm:mx-2">
              <Link
                to="/signup"
                className="bg-tomato text-white sm:py-2 sm:px-4 border-1 text-base py-1 px-2 sm:text-lg border-tomato sm:rounded-2xl rounded-md"
              >
                Signup
              </Link>
            </div>
          </>
        ) : (
          // Profile Button
          <div className="navbar-profile relative">
            <img
              src={assets.profile_icon}
              alt="profile"
              className="cursor-pointer"
              onClick={() => setProfileDropdown((prev) => !prev)}
            />
            {profileDropdown && (
              <ul className="navbar-profile-dropdown absolute  z-[10] flex flex-col gap-[10px] bg-[#fff2ef] px-3 py-6 border border-tomato border-spacing-2 left-[-100px] w-[120px] rounded-b-lg">
                <li className="flex justify-items-center gap-2">
                  <img src={assets.bag_icon} alt="" />
                  <a
                    href="/myorders"
                    className="hover:text-tomato cursor-pointer"
                  >
                    Orders
                  </a>
                </li>
                <hr />
                <li className="flex justify-items-center gap-2">
                  <img src={assets.logout_icon} alt="" />
                  <p
                    onClick={handleLogout}
                    className="hover:text-tomato cursor-pointer"
                  >
                    Logout
                  </p>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* Hamburger Icon */}
        <div className="hamburger-menu lg:hidden">
          <div className="w-7">
            {!menuClick ? (
              <button onClick={handleMenuClick}>
                <img src={assets.hamburger_icon} alt="Hamburger Icon" />
              </button>
            ) : (
              <button onClick={handleMenuClick}>
                <img src={assets.close_icon} alt="Close Icon" />
              </button>
            )}
          </div>
        </div>
        {/* Hamburger Menu */}
        <div>{menuClick && menuContent}</div>
      </div>
    </div>
  );
};

export default Navbar;
