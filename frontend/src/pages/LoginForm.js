//Dependencies
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/macro";

//Styling
import { PageWrapper, SmallHeading, Text} from "styling/GlobalStyling";
import { StyledForm } from "../components/form-components/FormStyling";

//Reducers
import { candidate } from "reducers/candidate";

//Components
import { PageHeading } from "../components/PageHeading";
import { Button } from "../components/Button";
import { TextInput } from "../components/form-components/TextInput";
import { Status } from "../components/Status";

// LOG IN FORM --------------------------------------
export const LoginForm = () => {
  const LOGIN_URL = "https://project-we-exist.herokuapp.com/sessions";
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(candidate.actions.setStatusMessage({ statusMessage: null }));
  }, [dispatch]);

  const handleLoginSuccess = (res) => {
    dispatch(
      candidate.actions.login({
        accessToken: res.accessToken,
        candidateId: res.candidateId,
      })
    );
    dispatch(
      candidate.actions.setStatusMessage({ statusMessage: "Successful Log In" })
    );
    history.push(`/${res.candidateId}/candidate`);
  };

  const handleLoginFailure = (err) => {
    dispatch(
      candidate.actions.setStatusMessage({ statusMessage: "Unable to login" })
    );
  };

  return (
    <>
      <PageWrapper>
        <PageHeading title="Log In" />
        <ContentContainer>
          <Text>
            Here's where you as a candidate can log in and edit your profile.
        </Text>
        </ContentContainer>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email format")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            fetch(LOGIN_URL, {
              method: "POST",
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
                throw new Error("Unable to Log In.");
              })
              .then((json) => {
                handleLoginSuccess(json);
              })
              .catch((err) => {
                handleLoginFailure(err);
              });
          }}
        >
          <StyledForm>
            <ContentContainer>
              <TextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </ContentContainer>
            <Status />

            <Button type="submit" text="Login" />
          </StyledForm>
        </Formik>
        <ContentContainer>
        <SmallHeading>Lost your password?</SmallHeading>
        <Text>
          Don't worry! Email us at projectweexist@gmail.com and we'll assist you
          as soon as we can.{" "}
          <span role="img" aria-label="letter">
            💌
          </span>
        </Text>
        </ContentContainer>
      </PageWrapper>
    </>
  );
};

const ContentContainer = styled.div`
   width: 80%;
   display: flex;
   flex-direction: column;
   align-items: center;
`;