import styled from "styled-components/macro";
import { Form } from "formik";

// GENERAL STYLING FOR FORMS --------------------------------------

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

//Container for holding multiple form inputs
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 667px) {
    width: 80%;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

//Styling for image upload
export const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2px;
  width: 100%;
  @media (min-width: 667px) {
    width: 400px;
  }
`;
export const ImageLabel = styled.label`
  font-weight: bold;
  display: flex;
  margin: 10px 0 5px 0;
`;

export const ImageInput = styled.input`
  padding: 0.65rem 0.5rem;
  font-size: 1rem;
  border: 2px solid #edf2f7;
  background-color: #f7fafc;
  color: #2d3748;
  border-radius: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  &:focus {
    outline: none;
    border: 2px solid #6c5ce7;
  }
  @media (min-width: 667px) {
    width: 100%;
  }
`;

// Error messages that appears under form inputs
export const ErrorMessage = styled.div`
  font-size: 12px;
  color: #e53e3e;
  margin-top: 0.25rem;
`;

//Trying this out on toggle atm
export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
