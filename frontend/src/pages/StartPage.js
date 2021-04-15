// Dependencies
import React from "react";
import { Link } from 'react-router-dom'
import Fade from "react-reveal-effects/Fade";
import styled from "styled-components/macro";

//Styling
import { PageWrapper, Image } from "../styling/GlobalStyling";

//Components
import { Hero } from "../components/Hero";
import { RocketAnimation } from "../components/RocketAnimation";

//Assets
import SearchSymbol from "assets/magnifying-glass.png";
import WomanSymbol from "assets/woman-laptop.png";
import CodingSymbol from "assets/coding.png";
import QuestionSymbol from "assets/interview.png";

//Styled components

const StartPageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 95%;

  @media (min-width: 1200px) {
    width: 85%;
  }
`;

const WelcomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  margin-top: 50px;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const WelcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
`;

const WelcomeHeading = styled.h1`
  font-size: 36px;
  font-weight: 800;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 42px;
  }

  @media (min-width: 1024px) {
    font-size: 52px;
  }
`;

const WelcomeText = styled.p`
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  font-family: "Montserrat", sans-serif;
`;

//Cards-section
const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const InfoCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  width: 100%;
  padding: 20px;
  margin: 20px;
  border: 1px solid;
  box-shadow: 5px 10px #d8cff8;
  cursor: pointer;
  text-decoration: none;
  color: #000;

  &:hover {
    box-shadow: 5px 10px;
    transition: 0.3s;
    padding: 25px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    width: 500px;
  }
`;

const InfoHeading = styled.h2`
  margin: 50px 0 20px 0;
  font-weight: 800;
`;

const InfoText = styled.div`
  padding: 10px;
  margin-left: 5px;
`;

// STARTPAGE --------------------------------------
export const StartPage = () => {
  return (
    <>
      {/* <h1>{props.title}</h1> */}
      <Hero> </Hero>
      <PageWrapper>
        <StartPageWrapper>
          <WelcomeWrapper>
            <WelcomeContent>
              <WelcomeHeading>WELCOME TO WE EXIST!</WelcomeHeading>
              <WelcomeText>
                We are here to empower women in IT & Tech, and contribute to the
                important job of closing the gender gap in the IT and
                Tech-business. We want to be the needle that punches empty
                arguments and explanations. We want to show that we exist, and
                that we are here to deliver!
              </WelcomeText>
              <WelcomeText>
                To you who are looking for a job and exciting opportunities - a
                warm welcome to a group that wants to deliver this to you! And
                for you as a company: Equal companies are both nicer, have a
                higher presence and perform better. Here you have sharp and
                smart talents who are ready to deliver value. Show us that you
                understand the benefits of equality and diversity in a company,
                and we will help you find the person who can strengthen your
                team.
              </WelcomeText>
              <WelcomeText>
                LET'S GO! 
                <span role="img" aria-label="rocket">
                   🚀
                </span>
              </WelcomeText>
            </WelcomeContent>
            <WelcomeContent>
              <RocketAnimation />
            </WelcomeContent>
          </WelcomeWrapper>

          <Fade bottom>
            <InfoHeading>FOR CANDIDATES</InfoHeading>
            <ContentWrapper>
              <InfoCard to="/signup">
                <Image src={WomanSymbol} alt="female developer" />
                <InfoText>
                  <h3>Get ready to shine!</h3>
                  <p>Learn more & sign up.</p>
                </InfoText>
              </InfoCard>

              <InfoCard to="/login">
                <Image src={CodingSymbol} alt="computer screen" />
                <InfoText>
                  <h3>Already a user?</h3>
                  <p>
                    Sit back and relax... or maybe you want to edit your
                    profile?
                  </p>
                </InfoText>
              </InfoCard>
            </ContentWrapper>
          </Fade>

          <Fade bottom>
            <InfoHeading>FOR EMPLOYERS</InfoHeading>
            <ContentWrapper>
              <InfoCard to="/candidates">
                <Image src={SearchSymbol} alt="magnifying glass" />
                <InfoText>
                  <h3>Candidate search</h3>
                  <p>
                    Looking for stars to light up your business? Browse around
                    on our candidates page.
                  </p>
                </InfoText>
              </InfoCard>

              <InfoCard to="/contact">
                <Image src={QuestionSymbol} alt="person with questions" />
                <InfoText>
                  <h3>Don't know where to begin...</h3>
                  <p>
                    Need some help to get started before star-gazing? Contact us
                    and we'll help you out!
                  </p>
                </InfoText>
              </InfoCard>
            </ContentWrapper>
          </Fade>
        </StartPageWrapper>
      </PageWrapper>
    </>
  );
};
