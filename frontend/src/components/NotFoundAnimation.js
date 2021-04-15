//Dependencies
import React from "react";
import Lottie from "react-lottie";

//Assets
import animationData from "../assets/lotties/sad-search.json";

// NOT-FOUND ANIMATION ------------------------------------------
export const NotFoundAnimation = () => {
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
      <Lottie options={defaultOptions} height={250} width={250} />
    </>
  );
};
