// Dependencies
import React from "react";
import * as Icon from "react-feather";
import { useHistory } from "react-router-dom";

import {
  FooterWrapper,
  FooterSection,
  SocialIcon,
  FooterButton,
  ContentWrapper,
} from "../styling/FooterStyling";

// FOOTER ------------------------------------------
export const Footer = () => {
  const history = useHistory();

  return (
    <FooterWrapper>
      <ContentWrapper>
        <FooterSection >
          <h3 tabIndex="0">WE EXIST</h3>
          <SocialIcon>
            <Icon.Instagram aria-label="instagram"/>
            <p tabIndex="0">projectweexist</p>
          </SocialIcon>
          <SocialIcon>
            <Icon.Mail aria-label="mailbox" />
            <p tabIndex="0">projectweexist@gmail.com</p>
          </SocialIcon>
        </FooterSection>
        <FooterSection>
          <h3 tabIndex="0">WHAT</h3>
          <h4 tabIndex="0">FEMALE CANDIDATES IN IT & TECH</h4>
        </FooterSection>
        <FooterSection>
          <h3 tabIndex="0">WHY</h3>
          <h4 tabIndex="0">TO CREATE AN EQUAL LABOR MARKET</h4>
        </FooterSection>
      </ContentWrapper>
      <FooterButton onClick={() => history.push("/contact")}>
        CONTACT US
      </FooterButton>
    </FooterWrapper>
  );
};
