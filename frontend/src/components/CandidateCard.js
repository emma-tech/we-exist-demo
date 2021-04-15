//Dependencies
import React from "react";
import styled from "styled-components/macro";
import * as Icon from "react-feather";

// STYLING FOR CANDIDATE CARD ------------------------------------------
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background: #f5f5f5;
  margin: 50px 15px 50px 15px;
  padding: 15px;
  width: 310px;
  height: 510px;
  border-radius: 15px;
  box-shadow: 0 10px 10px #999;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 5px 10px 10px #999;
  }

  @media (min-width: 769px) {
    margin: 70px 50px 70px 50px;
  }
`;

const Experience = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 451px) {
    flex-direction: row;
  }
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid #d0d0d0;
  position: absolute;
  top: -15%;
  right: 4%;
  object-fit: cover;

  @media (max-width: 285px) {
    width: 110px;
    height: 100px;
    top: -10%;
  }

  @media (min-width: 1220px) {
    width: 175px;
    height: 175px;
    top: -20%;
  }
`;

const Name = styled.h3`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  @media (min-width: 451px) {
    margin-left: 20px;
  }
`;

const TitleText = styled.h2`
  font-size: 20px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 285px) {
    font-size: 18px;
    text-align: left;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Text = styled.p`
  font-size: 16px;
  margin-left: 10px;
`;

const Description = styled.p`
  font-size: 16px;
`;

const Skills = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 5px;
  border-radius: 5px;
`;

// CANDIDATE CARD ------------------------------------------
export const CandidateCard = (props) => {
  const skillsArray = props.skills;

  return (
    <Card tabindex="0">
      <Flex >
        <Name >{props.firstName}</Name>
        <ProfilePicture src={props.imageUrl} alt="profile picture" />
      </Flex>
      <Flex>
        <Icon.ChevronsRight color="blueviolet" size="22" aria-label="chevronsright" />
        <TitleText>{props.title}</TitleText>
      </Flex>
      <SkillsContainer>
        {skillsArray.map((skill, index) => (
          <Skills key={index}> {(index ? "| " : "") + skill} </Skills>
        ))}
      </SkillsContainer>
      <Description>{props.description}</Description>
      <Flex>
        <Icon.Briefcase size="22" aria-label="briefcase" />
        <Experience>
          <Text>{props.experience}</Text>
          <Text>experience</Text>
        </Experience>
      </Flex>
      <Flex>
        <Icon.MapPin size="22" aria-label="mappin"/>
        <Text>{props.location}</Text>
      </Flex>
    </Card>
  );
};
