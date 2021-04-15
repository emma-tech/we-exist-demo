//Dependencies
import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components/macro";

//Assets
import animationData from "../assets/lotties/service-animation.json";

// ROCKET ANIMATION ------------------------------------------
export const HeroAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <LottieWrapper>
        <Lottie options={defaultOptions} />
      </LottieWrapper>
    </>
  );
};

const LottieWrapper = styled.div`
  width: 250px;

  @media (min-width: 324px) {
    width: 300px;
  }

  @media (min-width: 768px) {
    width: 400px;
  }

  @media (min-width: 1024px) {
    width: 450px;
  }
`;
