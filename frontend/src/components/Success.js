//Dependencies
import React from "react";
import styled from "styled-components/macro";
import Lottie from "react-lottie"; //Animation by Stephen Petrey on Lottiefiles

//Styling
import { Image, PageWrapper } from "../styling/GlobalStyling";

//Assets
import animationData from "../assets/lotties/confetti.json";
import Confetti from "assets/confetti.png";

// STYLING SUCCESS ANIMATION ------------------------------------------

const SuccessText = styled.p`
  color: #000;
  font-size: 28px;
  font-weight: 700;
  margin: 30px 0;
  text-align: center;
`;

// SUCCESS ANIMATION ------------------------------------------
export const Success = () => {
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
      <PageWrapper>
        <Lottie options={defaultOptions} height={250} width={250} />
        <Image src={Confetti} alt="confetti" />
        <SuccessText>THANK YOU FOR SIGNING UP!</SuccessText>
      </PageWrapper>
    </>
  );
};
