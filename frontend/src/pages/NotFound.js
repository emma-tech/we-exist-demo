import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import * as Icon from "react-feather";

//Styling
import { PageWrapper } from "../styling/GlobalStyling";

//Components
import { PageHeading } from "../components/PageHeading";
import { NotFoundAnimation } from "../components/NotFoundAnimation";

// NOT FOUND PAGE --------------------------------------
export const NotFound = () => {
  return (
    <>
      <PageWrapper>
        <PageHeading title="Ooops..." />
        <p>The page you're looking for doesn't exist.</p>
        <NotFoundAnimation />
        <BackWrapper>
          <BackLink to="/">
            <Icon.ChevronsLeft aria-label="chevronleft" />
            Back to startpage
          </BackLink>
        </BackWrapper>
      </PageWrapper>
    </>
  );
};

const BackLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const BackWrapper = styled.div`
  display: flex;
  height: 20px;
  align-items: center;
`;
