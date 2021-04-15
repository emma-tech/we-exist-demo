//Dependencies
import React from "react";
import styled from "styled-components/macro";

//Lottie
import Lottie from "react-lottie";
import animationData from "../assets/lotties/loadingbar.json";

// STYLING FOR LOADER ------------------------------------------
const LoaderBackground = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoaderText = styled.p`
  color: #ffffff;
  font-size: 16px;
`;

// LOADER ------------------------------------------
export const Loader = () => {
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
      <LoaderBackground>
        <LoaderText>Loading...</LoaderText>
        <Lottie options={defaultOptions} height={250} width={250} />
      </LoaderBackground>
    </>
  );
};
