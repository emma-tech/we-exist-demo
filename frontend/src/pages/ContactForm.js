import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { PageWrapper, Text } from "../styling/GlobalStyling";
import { Button } from "../components/Button";
import { PageHeading } from "../components/PageHeading";
import { Status } from "../components/Status";
import { candidate } from "../reducers/candidate";

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(candidate.actions.setStatusMessage({ statusMessage: null }));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://project-we-exist.herokuapp.com/contact", {
      method: "POST",
      body: JSON.stringify({ name, email, message }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Unable to send message, please check your e-mail and password."
          );
        } else {
          return res.json();
        }
      })
      .then((json) => {
        dispatch(
          candidate.actions.setStatusMessage({
            statusMessage: "The message was successfully sent!",
          })
        );
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        dispatch(
          candidate.actions.setStatusMessage({
            statusMessage: "Unable to send the message!",
          })
        );
      });
  };

  return (
    <PageWrapper>
      <PageHeading title="Contact Us" />
      <ContentWrapper>
        <TextWrapper>
          <Text>
            Welcome to We Exist - a service where you as a company or
            organization can find your next star! Equal companies are both
            nicer, have a higher presence and perform better. However, many
            companies seem to have problems recruiting women, so here you have
            the solution. Since you are reading this, we assume that you work
            for a company that is aware of gender equality and diversity, which
            we think is great! But you can never be completely sure, so
            honestly: are you ready to hire one of our stars? There's a
            responsibility coming with that. We want you as an employer to show
            us that you have a gender equality work, which is a requirement to
            be able to take part in our competent women.
          </Text>

          <Text>
            If yes: go ahead and send us a request. If not: don't be sad! We
            have consultants who are experts in gender equality and diversity.
            You are welcome to contact us and we will help you get on track by
            giving you access to our entire solar system of expertise.
          </Text>
        </TextWrapper>

        <StyledForm onSubmit={handleSubmit}>
          <TextInput
            label="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <TextInput
            type="text"
            name="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MessageInput
            label="message"
            type="textarea"
            placeholder="Write your message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          />
          <Status />
          <Button text="Send message" type="submit" />
        </StyledForm>
      </ContentWrapper>
    </PageWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin-top: 40px;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;

  @media (min-width: 1024px) {
    margin-top: 50px;
  }
`;

const TextInput = styled.input`
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
  width: 100%;
  &::placeholder {
    color: #a0aec0;
  }
  &:focus {
    outline: none;
    border: 2px solid #6c5ce7;
  }
  @media (min-width: 667px) {
    width: 400px;
  }
`;
const MessageInput = styled.textarea`
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
  &:focus {
    outline: none;
    border: 2px solid #6c5ce7;
  }

  @media (min-width: 667px) {
    width: 400px;
  }
`;
