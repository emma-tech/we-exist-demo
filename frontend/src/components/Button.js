import React from "react";
import styled from "styled-components/macro";

// STYLING FOR BUTTON ------------------------------------------
const StyledButton = styled.button`
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  border-radius: 10px;
  background-color: #4a5568;
  border: 2px solid #4a5568;
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 1rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  line-height: initial;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  &:hover {
    cursor: pointer;
    background-color: #2d3748;
  }
`;

// BUTTON ------------------------------------------
export const Button = (props) => {
  return (
    <StyledButton type={props.type} onClick={props.handleClick}>
      {props.text}
    </StyledButton>
  );
};
