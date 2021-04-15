//Dependencies
import React /*{ useRef, useState }*/ from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/macro";

import { candidate } from "../../reducers/candidate";

//Styling
import {
  StyledForm,
  FormGroup,
  //ImageUploadContainer,
  //ImageLabel,
  //ImageInput,
} from "./FormStyling";

//Components
import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";

//EDIT PROFILE FORM --------------------------------------
export const ProfileForm = ({ toggleIsOn, setUpdate, update }) => {
  //const fileInput = useRef();
  const dispatch = useDispatch();
  //const [newImage, setNewImage] = useState(false);

  const candidateInfo = useSelector((store) => store.candidate.candidate);
  const candidateId = useSelector((store) => store.candidate.login.candidateId);

  return (
    <>
      <Formik
        initialValues={{
          firstName: candidateInfo.firstName,
          lastName: candidateInfo.lastName,
          email: candidateInfo.email,
          phoneNumber: candidateInfo.phoneNumber,
          location: candidateInfo.location,
          title: candidateInfo.title,
          skillOne: candidateInfo.skills[0],
          skillTwo: candidateInfo.skills[1],
          skillThree: candidateInfo.skills[2],
          experience: candidateInfo.experience,
          description: candidateInfo.description,
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
        })}
        onSubmit={(values) => {
          toggleIsOn();
          setUpdate(!update);

          fetch(
            `https://project-we-exist.herokuapp.com/candidates/${candidateId}`,
            {
              method: "PATCH",
              body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                location: values.location,
                title: values.title,
                skillOne: values.skillOne,
                skillTwo: values.skillTwo,
                skillThree: values.skillThree,
                experience: values.experience,
                description: values.description,
              }),
              headers: { "Content-Type": "application/json" },
            }
          )
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              throw new Error("Could not edit info, please try again");
            })
            .then((json) => {
              dispatch(
                candidate.actions.setStatusMessage({
                  statusMessage: json.message,
                })
              );
            })
            .catch((error) => {
              dispatch(
                candidate.actions.setStatusMessage({
                  statusMessage: error.message,
                })
              );
            });

          /* Why doesn't this work?? Says that fileInput is null...
          if (newImage) {
         
            const formData = new FormData();
            formData.append("imageUrl", fileInput.current.files[0]);

            fetch(`https://project-we-exist.herokuapp.com/candidate/image/${candidateId}`, {
              method: "PATCH",
              body: formData,
            })
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
                throw new Error("Could not edit image, please try again");
              })
              .then((json) => {
                dispatch(
                  candidate.actions.setStatusMessage({
                    statusMessage: json.message,
                  })
                );
              })
              .catch((error) => {
                dispatch(
                  candidate.actions.setStatusMessage({
                    statusMessage: error.message,
                  })
                );
              });
          } */
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
            {/*<ImageUploadContainer>
              <ImageLabel>Profile picture *</ImageLabel>
              <ImageInput
                type="file"
                ref={fileInput}
                onChange={() => setNewImage(true)}
                accept="image/*"
            />
            </ImageUploadContainer>*/}
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

          <ButtonContainer>
            <EditButtonStyle
              color="rgb(46, 160, 67)"
              onhover="rgb(56, 170, 77)"
              type="submit"
            >
              Save
            </EditButtonStyle>
            <EditButtonStyle
              color="rgb(48, 54, 61)"
              onhover="rgb(58, 64, 71)"
              type="button"
              onClick={toggleIsOn}
            >
              Cancel
            </EditButtonStyle>
          </ButtonContainer>
        </StyledForm>
      </Formik>
    </>
  );
};

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 667px) {
    width: 400px;
  }
  @media (min-width: 1024px) {
    justify-content: center;
  }
`;

const EditButtonStyle = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  color: white;
  text-decoration: none;
  font-family: "Montserrat";
  margin-bottom: 1rem;
  margin-right: 1rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  line-height: initial;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.onhover};
  }
`;
