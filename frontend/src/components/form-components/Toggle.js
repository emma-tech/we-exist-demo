//Dependencies
import React, { useState, useCallback } from "react";
import Fade from "react-reveal-effects/Fade";
import * as Icon from "react-feather";
import styled from "styled-components/macro";

//Components
import { ProfileForm } from "./ProfileForm";

//Function to toggle the edit form
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((value) => !value);
  }, []);
  return [value, toggle];
};

// TOGGLE --------------------------------------
export const Toggle = ({ setUpdate, update }) => {
  const [isOn, toggleIsOn] = useToggle();

  return (
    <>
      <ToggleContainer>
        <ToggleButton onClick={toggleIsOn}>
          Edit profile
          <Icon.ChevronsRight
            size="22"
            className={isOn ? "rotate icon" : "icon"}
          />
        </ToggleButton>
      </ToggleContainer>
      {isOn ? (
        <FadeContainer>
          <Fade>
            {" "}
            <ProfileForm
              setUpdate={setUpdate}
              update={update}
              toggleIsOn={toggleIsOn}
            />{" "}
          </Fade>
        </FadeContainer>

      ) : (
        ""
      )}
    </>
  );
};

const FadeContainer = styled.div`
  width: 100%;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ToggleButton = styled.button`
  width: 80%;
  max-width: 320px;
  height: 40px;
  padding: 0.2rem 1.25rem 0.8rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: "Montserrat";
  text-decoration: none;
  color: white;
  background-color: #4a5568;
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

  .icon {
    position: relative;
    top: 5px;
    left: 3px;
    color: white;
  }

  @media (min-width: 667px) {
    max-width: 200px;
  }
`;
