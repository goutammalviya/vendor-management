import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar card m-3 border-0 navbar-expand-lg navbar-light px-4 box-shadow" style={{backgroundColor: "#87ceeb"}}>
        <div className="d-flex card-body  w-100 justify-content-between">
          <div className="center-xy">
            {" "}
            <a className="navbar-brand h1 m-0 fs-3 fw-bold" style={{color: "darkblue"}} href="#">
              Vendor Management
            </a>
          </div>
          <div
            className="collapse navbar-collapse fw-semibold justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav fs-4">
              <NavLink className="nav-item nav-link  " to="/">
                Add Vendor
              </NavLink>
              <NavLink className="nav-item nav-link " to="/vendor">
                Vendors List
              </NavLink>
              <NavLink className="nav-item nav-link " to="/suggested_vendors">
                suggested vendors
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
