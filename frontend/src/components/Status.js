//Dependencies
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";


// STATUS MESSAGE ------------------------------------------
export const Status = () => {
  const statusMessage = useSelector((store) => store.candidate.login.statusMessage);

  return (
    <>
        {statusMessage && (
          <StatusWrapper>
            <p>{`${statusMessage}`}</p>
          </StatusWrapper>
        )}
    </>
  );
};

// STYLING ------------------------------------------
const StatusWrapper = styled.div`
  font-weight: bold;
  font-size: 14px; 
   margin: 10px; 
`;
