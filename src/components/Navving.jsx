import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addSessionData } from "../store/action/sessionAction";
import { storeAllCategory } from "../store/action/categoryAction";
import { getCartInfo } from "../store/action/cartAction";
import "../css/navscreen.css";

function Navving() {
  const { count } = useSelector((state) => state.cartStore);
  const session = useSelector((state) => state.sessionStore);
  const categories = useSelector((state) => state.categoryStore);

  const history = useHistory(false);
  const dispatch = useDispatch();
  const routePage = (url) => {
    history.push(url);
  };
  useEffect(() => {
    dispatch(storeAllCategory());
    dispatch(getCartInfo());
  }, []);

  const logOut = () => {
    sessionStorage.removeItem("jwtToken");
    dispatch(addSessionData({ token: "", role: "", expire_at: "" }));
    dispatch(getCartInfo());
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  const recordButtonPosition = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  let routePage2 = (url) => {
    history.push(url);
    setMenuOpen(false);
  };
  let closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <header>
      <div className="main_nav_container">
        <Container>
          <div className="row">
            <div className="col-lg-12 text-right">
              <div className="logo_container">
                <LinkContainer to="/">
                  <Navbar.Brand>
                    Shopping<span>Mania</span>
                  </Navbar.Brand>
                </LinkContainer>
              </div>

              <nav className="navbar">
                <ul className="navbar_menu">
                  <li onClick={() => routePage("/cart")}>
                    <Nav.Link>Cart ({count})</Nav.Link>
                  </li>

                  <li>
                    {session.expire_at > new Date().valueOf() && (
                      <LinkContainer to="/order">
                        <Nav.Link>Order</Nav.Link>
                      </LinkContainer>
                    )}
                  </li>

                  <li>
                    {session.expire_at > new Date().valueOf() && (
                      <LinkContainer to="/user">
                        <Nav.Link>user profile</Nav.Link>
                      </LinkContainer>
                    )}
                  </li>
                  <li>
                    {session.role == "admin" &&
                      session.expire_at > new Date().valueOf() && (
                        <LinkContainer to="/dashboard">
                          <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>
                      )}
                  </li>
                  <li>
                    {session.token &&
                    session.expire_at > new Date().valueOf() ? (
                      <li onClick={logOut}>
                        <Nav.Link>Logout</Nav.Link>
                      </li>
                    ) : (
                      <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Navving;
