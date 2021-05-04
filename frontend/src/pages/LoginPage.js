import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";

//Reducers
import { candidate } from "../reducers/candidate";

//Styling
import { PageWrapper, SmallHeading } from "../styling/GlobalStyling";

//Components
import { Toggle } from "../components/form-components/Toggle";
import { Loader } from "../components/Loader";

// LOGIN PAGE --------------------------------------
export const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [update, setUpdate] = useState(false);

  const candidateId = useSelector((store) => store.candidate.login.candidateId);
  const accessToken = useSelector((store) => store.candidate.login.accessToken);
  const loader = useSelector((store) => store.candidate.login.isLoading);

  const candidateInfo = useSelector((store) => store.candidate.candidate);

  // WARNING IN CONSOLE, ADD getCandidateInfo in dependency array??
  useEffect(() => getCandidateInfo(candidateId, accessToken), [
    candidateId,
    accessToken,
    update,
  ]);

  const getCandidateInfo = (candidateId, accessToken) => {
    dispatch(candidate.actions.setLoader(true));
    
    fetch(`https://we-exist-demo-technigo.herokuapp.com/candidates/${candidateId}`, {
      method: "GET",
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(
          "Could not get information, please make sure you are logged in."
        );
      })
      .then((json) => {
        dispatch(candidate.actions.setCandidateInfo(json.candidate));
        dispatch(candidate.actions.setLoader(false));
      })
      .catch((error) => {
        dispatch(
          candidate.actions.setStatusMessage({ statusMessage: error.message })
        );
      });
  };

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      handleDeleteAccount();
    }
  };
  
  const handleDeleteAccount = () => {
    fetch(`https://we-exist-demo-technigo.herokuapp.com/candidates/${candidateId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Could not delete candidate");
      })
      .then((json) => {
        dispatch(
          candidate.actions.setStatusMessage({ statusMessage: json.message })
        );
        dispatch(candidate.actions.logout());
        dispatch(candidate.actions.emptyCandidateInfo());
        history.push(`/`);
        alert("Your account was deleted");
      })
      .catch((error) => {
        dispatch(
          candidate.actions.setStatusMessage({ statusMessage: error.message })
        );
      });
  };

  const handleLogOut = () => {
    dispatch(candidate.actions.logout());
    dispatch(candidate.actions.emptyCandidateInfo());
    dispatch(candidate.actions.setStatusMessage({ statusMessage: "" }));
    history.push(`/`);
  };

  return (
    <PageWrapper>
      {loader && <Loader />}
      {!loader && (
        <>
          <SmallHeading tabIndex="0">Welcome {candidateInfo.firstName}!</SmallHeading>
          <Imagediv src={candidateInfo.imageUrl}></Imagediv>
          <Toggle setUpdate={setUpdate} update={update} />
          <LogoutText>Log out from your account</LogoutText>
          <LogoutButton
            type="button"
            color="#4a5568"
            hover="#2d3748"
            onClick={handleLogOut}
          >
            Log out
          </LogoutButton>
          <ButtonText>No need for an account anymore?</ButtonText>
          <StyledButton
            type="submit"
            color="#f72f2f"
            hover="#ff4343"
            onClick={confirmDelete}
          >
            Delete account
          </StyledButton>
        </>
      )}
    </PageWrapper>
  );
};

const Imagediv = styled.div`
  width: 150px;
  height: 150px;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin: 10px 0 20px 0;

  @media (min-width: 667px) {
    width: 250px;
    height: 250px;
    margin: 20px 0 30px 0;
  }

  @media (min-width: 1024px) {
    width: 300px;
    height: 300px;
    margin: 20px 0 30px 0;
  }
`;

const ButtonText = styled.p`
  font-size: 14px;
  margin-bottom: 5px;

  @media (min-width: 667px) {
    font-size: 16px;
  }
`;

const LogoutText = styled(ButtonText)`
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const StyledButton = styled.button`
  width: 80%;
  max-width: 320px;
  padding: 0.5rem 1.25rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  font-family: "Montserrat";
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  line-height: initial;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.hover};
  }

  @media (min-width: 667px) {
    max-width: 200px;
  }
`;
export const LogoutButton = styled(StyledButton)`
  @media (min-width: 1024px) {
    position: absolute;
    right: 100px;
    top: 150px;
    width: 120px;
  }
`;
