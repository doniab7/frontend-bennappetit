import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { MdFoodBank, MdLogin, MdLogout } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { useSidebarContext } from "../../context/sidebarContext";
import { useAuthContext } from "../../context/authenticationContext";

const Navbar = () => {
  const { openSidebar } = useSidebarContext();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { authUser, isLoggedIn } = useAuthContext();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar bg-orange flex align-center ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container w-100">
        <div className="navbar-content text-white">
          <div className="brand-and-toggler flex align-center justify-between">
            <Link to="/" className="navbar-brand fw-3 fs-22 flex align-center">
              <MdFoodBank />
              <span className="navbar-brand-text fw-7">BennAppetit</span>
            </Link>
            <div className="navbar-btns flex align-center">
              <button
                type="button"
                className="navbar-show-btn text-white"
                onClick={() => openSidebar()}
              >
                <IoMdMenu size={27} />
              </button>
              {isLoggedIn ? (
                <button
                  type="button"
                  className="navbar-show-btn text-white navbar-brand-text fw-5 "
                  onClick={() => navigate("/user/:id")}
                >
                  {authUser.username}
                </button>
              ) : (
                <button
                  type="button"
                  className="navbar-show-btn text-white navbar-brand-text fw-6 mx-3"
                  onClick={() => navigate("/signup")}
                >
                  <MdLogin size={24} className="mr-1" /> login
                </button>
              )}

              {isLoggedIn ? (
                <button
                  type="button"
                  className="navbar-show-btn text-white navbar-brand-text fw-5 mx-1"
                  onClick={() => navigate("/")}
                >
                  <MdLogout size={20} className="mr-1" /> logout
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
