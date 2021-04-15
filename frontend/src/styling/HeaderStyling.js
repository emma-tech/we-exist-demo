import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
  background: #f0f0f0;
  height: 15vh;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
  color: #000;
  margin: 0 20px;
`;

export const LogoLink = styled(NavLink)`
  text-decoration: none;
`;

const activeClassName = "nav-item-active";
export const PageLink = styled(NavLink).attrs({ activeClassName })`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  padding: 10px 0;

  &.${activeClassName} {
    color: blueviolet;

    .icon {
      color: blueviolet;
    }
  }

  &:hover {
    background: whitesmoke;
    transition: 0.3s ease;
  }

  .icon {
    color: #000;
    margin: 0 20px;
  }

  @media (min-width: 816px) {
    padding: 10px 20px 10px 0;

    &:hover {
      background: none;
      color: blueviolet;
      transition: 0.3s ease;
    }

    .icon {
      display: none;
    }
  }
`;

export const Navbar = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  z-index: 5;

  @media only screen and (max-width: 815px) {
    flex-direction: column;
    background: #d8cff8;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    margin-top: 0;
    top: 0;
    right: 0;
    height: 360px;
    width: 100%;
    padding-top: 3rem;
    padding-bottom: 1rem;
    transition: transform 0.3s ease-in-out;

    li {
      margin-top: 0;
    }
  }
  @media (min-width: 816px) {
    flex-direction: row;

    li {
      margin: 0 10px;
    }
  }
`;

export const StyledBurger = styled.div`
  width: 3rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #d8cff8;
  cursor: pointer;
  border-radius: 5%;
  @media (min-width: 815px) {
    display: none;
  }

  div {
    border-radius: 10px;
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => (open ? "#000" : "#000")};
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }

    @media (min-width: 815px) {
      display: none;
    }
  }
`;
