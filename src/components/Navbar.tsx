import React from "react";
import logo from "../assets/logo.png";
import {
  CCollapse,
  CContainer,
  CNavItem,
  CNavLink,
  CNavbar,
  CNavbarNav,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  return (
    <>
      <div className="navbar">
        <CNavbar expand="lg" colorScheme="light" className="bg-light">
          <CContainer fluid>
            <div className="nav-logo">
              <img
                src={logo}
                width={40}
                height={60}
                className="logo"
                alt="Hostas logo"
              />
            </div>
            <div className="nav-right">
              <CCollapse className="navbar-collapse" visible={true}>
                  <CNavbarNav>
                    <div className="nav-items">
                      <CNavItem>
                        <CNavLink href="#" active>
                          Home
                        </CNavLink>
                      </CNavItem>
                    </div>
                    <div className="nav-items">
                      <CNavItem>
                        <CNavLink href="#" active>
                          Profile
                        </CNavLink>
                      </CNavItem>
                    </div>
                  </CNavbarNav>
              </CCollapse>
            </div>
          </CContainer>
        </CNavbar>
      </div>
    </>
  );
};

export default Navbar;