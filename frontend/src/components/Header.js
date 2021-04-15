// Dependencies
import React, { useState } from "react";
import * as Icon from "react-feather";

import {
  Nav,
  Navbar,
  StyledBurger,
  Logo,
  PageLink,
  LogoLink,
} from "../styling/HeaderStyling";

// HEADER ------------------------------------------
export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Nav>
        <LogoLink to="/">
          <Logo tabindex="0">We Exist!</Logo>
        </LogoLink>

        <Navbar open={open}>
          <PageLink to="/about" onClick={() => setOpen(!open)}>
            <Icon.BookOpen className="icon" size="22" />
            <li>About</li>
          </PageLink>
          <PageLink to="/candidates" onClick={() => setOpen(!open)}>
            <Icon.Users className="icon" size="22" />
            <li>Candidates</li>
          </PageLink>
          <PageLink to="/signup" onClick={() => setOpen(!open)}>
            <Icon.Edit className="icon" size="22" />
            <li>Sign up</li>
          </PageLink>
          <PageLink to="/login" onClick={() => setOpen(!open)}>
            <Icon.LogIn className="icon" size="22" />
            <li>Log in</li>
          </PageLink>
          <PageLink to="/contact" onClick={() => setOpen(!open)}>
            <Icon.Mail className="icon" size="22" />
            <li>Contact</li>
          </PageLink>
          <PageLink to="/gdpr" onClick={() => setOpen(!open)}>
            <Icon.Check className="icon" size="22" />
            <li>GDPR</li>
          </PageLink>
        </Navbar>

        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>
      </Nav>
    </>
  );
};
