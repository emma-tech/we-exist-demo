import styled from "styled-components/macro";

export const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TextContainer = styled.div`
  width: 75%;
  margin-top: 20px;
`;

export const SmallHeading = styled.h2`
  margin-top: 40px;
`;

export const Image = styled.img`
  width: 140px;
  padding: 10px;
  margin: 10px;

  @media (max-width: 767px) {
    width: 120px;
    margin-bottom: 20px;
  }
`;

export const Text = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  padding: 5px;
`;

export const StatusMessage = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin: 10px;
`;
