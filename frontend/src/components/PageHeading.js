//Dependencies
import React from "react";
import styled from "styled-components/macro";

// STYLING FOR PAGE HEADING ------------------------------------------
const Heading = styled.h1`
  text-align: center;
  margin-top: 60px;
  //font-size: 36px;
  padding: 5px;
`;

// PAGE HEADING ------------------------------------------
export const PageHeading = ({ title }) => {
  return <Heading tabIndex="0">{title}</Heading>;
};
