import { candidate } from "./candidate";

const SIGNUP_URL = 'https://we-exist-demo-technigo.herokuapp.com/candidates';

//fetch for signup
export const signup = (formData) => {
  return (dispatch) => {
    fetch(SIGNUP_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Unable to Sign Up, please check your e-mail and password."
          );
        } else {
          return res.json();
        }
      })
      .then((json) => {
        dispatch(
          candidate.actions.login({
            candidateId: json.candidateId,
            accessToken: json.accessToken,
          })
        );
        dispatch(
          candidate.actions.setStatusMessage({
            statusMessage: "Successful Sign Up",
          })
        );
        dispatch(candidate.actions.setLoader(false));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(
          candidate.actions.setStatusMessage({
            statusMessage: "Unable to sign up",
          })
        );
      });
  };
};
