// Dependencies
import React from "react";
import { useField } from "formik";
import styled from "styled-components/macro";

//Styling
import { ErrorMessage } from "./FormStyling";

// STYLING FOR CHECKBOX -------------------------------
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 20px 0;
  @media (min-width: 667px) {
    width: 400px;
  }
`;
const StyledLabelCheckbox = styled.label`
  font-weight: normal;
`;

const StyledInputCheckbox = styled.input`
  display: inline-block;
  height: 1rem;
  font-size: 1rem;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid #e2e8f0;
  width: 1rem;
  background-color: white;
  align-self: center;
  margin-right: 0.5rem;
  &:hover {
    cursor: pointer;
  }
  &:checked {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="78.369" height="78.369" viewBox="0 0 78.369 78.369"><path fill="white" d="M78.05 19.015l-48.592 48.59c-.428.43-1.12.43-1.548 0L.32 40.016c-.427-.426-.427-1.12 0-1.547l6.704-6.704c.428-.427 1.12-.427 1.548 0l20.113 20.112 41.113-41.113c.43-.427 1.12-.427 1.548 0l6.703 6.704c.427.427.427 1.12 0 1.548z"/></svg>');
    background-size: contain;
    background-color: #4a5568;
    border: 2px solid #4a5568;
  }
`;

// CHECKBOX --------------------------------------
export const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <CheckboxContainer>
      <StyledLabelCheckbox>
        <StyledInputCheckbox type="checkbox" {...field} {...props} />
        {children}
      </StyledLabelCheckbox>
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </CheckboxContainer>
  );
};
