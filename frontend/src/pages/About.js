import React from "react";
import styled from "styled-components/macro";

//Styling
import { PageWrapper, TextContainer } from "../styling/GlobalStyling";

//Components
import { PageHeading } from "../components/PageHeading";

import DeveloperImg from "assets/developers.jpg";

const Photo = styled.img`
  margin-top: 10px;
  width: 80%;
`;

// ABOUT PAGE --------------------------------------
export const About = () => {
  return (
    <>
      <PageWrapper>
        <PageHeading title="About Us" />
        <TextContainer>
          <p>
            "There are no female programmers, we never find any engineers who
            are women, there are not enough women in our industry"...
          </p>
        </TextContainer>
        <TextContainer>
          <p>
            When we had heard these arguments a few times too much, we realized
            that now it must be enough! For some companies we are mostly a myth,
            a phenomenon that they do not even believe exists, while for others
            we are rather seen as a rare phenomenon that you do not know where
            to look for. Regardless, we are here to show: we exist!
          </p>
        </TextContainer>
        <TextContainer>
          <p>
            We want to be the needle that punches empty arguments and
            explanations. We want to show that we exist and are here to deliver!
          </p>
          <Photo src={DeveloperImg} alt="female developers" />
        </TextContainer>
        <TextContainer>
          <p>
            To you who are looking for a job and exciting opportunities - a warm
            welcome to a group that wants to deliver this to you!{" "}
            <span role="img" aria-label="glitter">
              ✨
            </span>
          </p>
          <p>
            And for you as a company: here you have sharp and smart talents who
            want to deliver value. Show us that you understand the benefits of
            equal companies and we will help you find the person who can
            strengthen your team.{" "}
            <span role="img" aria-label="rocket">
              🚀
            </span>
          </p>
        </TextContainer>
      </PageWrapper>
    </>
  );
};
