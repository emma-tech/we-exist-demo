//Dependencies
import React from "react";
import { useField } from "formik";
import styled from "styled-components/macro";

//Styling
import { ErrorMessage } from "./FormStyling";

// STYLE FOR TEXTAREA -------------------------------------------------
const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 10px;
  @media (min-width: 667px) {
    width: 400px;
  }
`;

const StyledLabelInput = styled.label`
  font-weight: bold;
  display: flex;
  margin: 10px 0 5px 0;
`;

const StyledTextArea = styled.textarea`
  height: 120px;
  width: 100%;
  resize: none;
  margin-bottom: 30px;
  padding: 0.65rem 0.5rem;
  font-size: 1rem;
  border: 2px solid #edf2f7;
  background-color: #f7fafc;
  color: #2d3748;
  border-radius: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::placeholder {
    color: #a0aec0;
  }
  &:invalid {
    border: 2px solid #ff7d87;
    box-shadow: none;
  }
  &:focus {
    outline: none;
    border: 2px solid #6c5ce7;
  }

  @media (min-width: 667px) {
    width: 100%;
  }
`;

// TEXT INPUT --------------------------------------
export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextInputContainer>
      <StyledLabelInput htmlFor={props.id || props.name}>
        {label}
      </StyledLabelInput>
      <StyledTextArea {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </TextInputContainer>
  );
};
