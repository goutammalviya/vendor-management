import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <a className="navbar-brand" href="#">
          vendor management
        </a>
       
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link active " to='/'>
              Add Vendor
            </NavLink>
            <NavLink className="nav-item nav-link " to='/vendor'>
              Vendors List
            </NavLink>
            <NavLink className="nav-item nav-link " to='/suggested_vendors'>
              suggested vendors
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;