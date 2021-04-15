import styled from "styled-components/macro";

export const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: stretch;
  width: 100%;
  margin-top: 120px;
  bottom: 0;
  background: #f0f0f0;

  @media (min-width: 667px) {
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 667px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100px;
  padding: 10px 0;
  margin-top: 20px;
  width: 80%;

  @media (min-width: 667px) {
    height: 150px;
    width: 32%;
    padding: 30px 20px;
    align-items: flex-start;
    text-align: left;

    h3 {
      font-size: 16px;
    }

    h4 {
      font-size: 14px;
    }
  }

  @media (min-width: 1024px) {
    height: 200px;
    width: 30%;
    padding: 30px 20px;
    align-items: flex-start;

    h3 {
      font-size: 18px;
    }
    h4 {
      font-size: 20px;
    }
  }
`;

export const SocialIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    margin-left: 5px;
  }
`;

export const FooterButton = styled.button`
  width: 200px;
  height: 45px;
  border-radius: 3px;
  color: #fff;
  background: #000;
  border: none;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  font-family: "Montserrat";
  margin: 20px 0 40px 0;
  cursor: pointer;
`;
