//Dependencies
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

//Reducers
import { candidate } from "reducers/candidate";
import { signup } from "reducers/fetches";

//Styling
import {
  PageWrapper,
  TextContainer,
  SmallHeading,
} from "styling/GlobalStyling";

import {
  StyledForm,
  FormGroup,
  ImageUploadContainer,
  ImageLabel,
  ImageInput,
} from "../components/form-components/FormStyling";

//Components
import { PageHeading } from "../components/PageHeading";
import { Button } from "../components/Button";
import { Checkbox } from "../components/form-components/Checkbox";
import { TextInput } from "../components/form-components/TextInput";
import { Success } from "../components/Success";
import { Loader } from "../components/Loader";
import { Status } from "../components/Status";
import { TextArea } from "components/form-components/TextArea";

//SIGN UP FORM --------------------------------------
export const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInput = useRef();
  const [signedUp, setSignedUp] = useState(false);
  const statusMessage = useSelector(
    (store) => store.candidate.login.statusMessage
  );
  const loader = useSelector((store) => store.candidate.login.isLoading);

  useEffect(() => {
    dispatch(candidate.actions.setStatusMessage({ statusMessage: null }));
  }, [dispatch]);

  return (
    <PageWrapper>
      {!loader && signedUp && statusMessage && (
        <>
          <Success />
          <Button
            type="button"
            handleClick={() => history.push("/candidates")}
            text="View candidates"
          />
        </>
      )}
      {loader && !statusMessage && <Loader />}
      {!signedUp && (
        <>
          <PageHeading title="Sign Up" />
          <TextContainer>
            <p>
              At We Exist, we are driven by lifting awesome women in IT & Tech. We know that you
              have what it takes, we know that you can deliver what the business and the
              companies need. So let´s show them!
            </p>
          </TextContainer>
          <TextContainer>
            <p>
              By signing up on our platform, you have the opportunity to be
              matched with a company that is looking for you and your skills.
              You also get access to our job advertisements and can also be
              hired as a consultant in one of our consulting teams.
            </p>
          </TextContainer>
          <SmallHeading>Create your profile</SmallHeading>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              location: "",
              title: "",
              skillOne: "",
              skillTwo: "",
              skillThree: "",
              experience: "",
              description: "",
              password: "",
              confirmPassword: "",
              acceptedTerms: false,
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .min(2, "Must be at least 2 characters")
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              phoneNumber: Yup.string(),
              location: Yup.string()
                .max(30, "Must be 30 characters or less")
                .required("Required"),
              title: Yup.string()
                .required("Required")
                .max(30, "Must be 30 characters or less"),
              skillOne: Yup.string().required("Required"),
              skillTwo: Yup.string().required("Required"),
              skillThree: Yup.string().required("Required"),
              experience: Yup.string().required("Required"),
              description: Yup.string()
                .max(250, "Must be 250 characters or less")
                .required("Required"),
              password: Yup.string()
                .matches(
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
                  "Password must contain at least 8-16 characters, one uppercase, one number and one special case character"
                )
                .required("Required"),
              confirmPassword: Yup.string()
                .required("Please confirm your password")
                .when("password", {
                  is: (password) =>
                    password && password.length > 0 ? true : false,
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Password doesn't match"
                  ),
                }),
              acceptedTerms: Yup.boolean()
                .required("Required")
                .oneOf([true], "You must accept the terms and conditions."),
            })}
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("imageUrl", fileInput.current.files[0]);
              formData.append("firstName", values.firstName);
              formData.append("lastName", values.lastName);
              formData.append("email", values.email);
              formData.append("phoneNumber", values.phoneNumber);
              formData.append("location", values.location);
              formData.append("title", values.title);
              formData.append("skillOne", values.skillOne);
              formData.append("skillTwo", values.skillTwo);
              formData.append("skillThree", values.skillThree);
              formData.append("experience", values.experience);
              formData.append("description", values.description);
              formData.append("password", values.password);
              formData.append("acceptedTerms", values.acceptedTerms);

              dispatch(signup(formData));
              dispatch(candidate.actions.setLoader(true));
              setSignedUp(true);
            }}
          >
            <StyledForm>
              <FormGroup>
                <TextInput
                  label="First Name *"
                  name="firstName"
                  type="text"
                  placeholder="Enter your name"
                />
                <TextInput
                  label="Last Name *"
                  name="lastName"
                  type="text"
                  placeholder="Enter your lastname"
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label="Email Address *"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <TextInput
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label="Location *"
                  name="location"
                  type="text"
                  placeholder="Enter your location"
                />
                <TextInput
                  label="Title *"
                  name="title"
                  type="text"
                  placeholder="Enter your work title"
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label="Skill *"
                  name="skillOne"
                  type="text"
                  placeholder="Enter your first skill"
                />
                <TextInput
                  label="Skill *"
                  name="skillTwo"
                  type="text"
                  placeholder="Enter your second skill"
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label="Skill *"
                  name="skillThree"
                  type="text"
                  placeholder="Enter your third skill"
                />
                <ImageUploadContainer>
                  <ImageLabel>Profile picture *</ImageLabel>
                  <ImageInput
                    type="file"
                    ref={fileInput}
                    accept="image/*"
                    required
                  />
                </ImageUploadContainer>
              </FormGroup>
              <FormGroup>
                <TextInput
                  label="Experience *"
                  name="experience"
                  type="text"
                  placeholder="0-1 year/s"
                />
                <TextArea
                  label="Description *"
                  name="description"
                  type="text"
                  placeholder="Enter your description"
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label="Password *"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <TextInput
                  label="Confirm password *"
                  name="confirmPassword"
                  type="password"
                  placeholder="Type your password again"
                />
              </FormGroup>
              <Checkbox name="acceptedTerms">
                I accept the terms and conditions *
              </Checkbox>
              <Status />
              <Button type="submit" text="Sign Up" />
            </StyledForm>
          </Formik>
        </>
      )}
    </PageWrapper>
  );
};
