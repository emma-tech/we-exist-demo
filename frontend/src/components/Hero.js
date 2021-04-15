// Dependencies
import React from "react";
import styled from "styled-components/macro";
import Fade from "react-reveal-effects/Fade";

import { HeroAnimation } from "../components/HeroAnimation";

// STYLING FOR HERO ------------------------------------------
const HeroBackground = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #4776e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #8e54e9,
    #4776e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #8e54e9, #4776e6);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const HeroHeader = styled.h1`
  color: #fff;
  font-weight: 800;
  font-size: 64px;
  text-align: center;
`;

// HERO ------------------------------------------
export const Hero = () => {
  return (
    <HeroBackground>
      <HeroHeader>
        <Fade bottom>WE EXIST </Fade>
      </HeroHeader>
      <HeroAnimation />
    </HeroBackground>
  );
};
