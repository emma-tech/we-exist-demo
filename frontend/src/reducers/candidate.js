import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: null,
    candidateId: 0,
    statusMessage: "",
    loggedIn: false,
    isLoading: false,
  },
  candidate: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    title: "",
    skills: [],
    experience: "",
    description: "",
    imageUrl: "",
  },
};

export const candidate = createSlice({
  name: "candidate",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, candidateId } = action.payload;
      state.login.accessToken = accessToken;
      state.login.candidateId = candidateId;
      state.login.loggedIn = true;
    },

    setStatusMessage: (state, action) => {
      const { statusMessage } = action.payload;
      state.login.statusMessage = statusMessage;
    },

    logout: (state, action) => {
      state.login.accessToken = null;
      state.login.candidateId = 0;
      state.login.loggedIn = false;
    },

    toggleForm: (state, action) => {
      const { isShowing } = action.payload;
      state.candidate.isShowing = isShowing;
    },

    setCandidateInfo: (state, action) => {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        location,
        title,
        skills,
        experience,
        description,
        imageUrl,
      } = action.payload;

      state.candidate.firstName = firstName;
      state.candidate.lastName = lastName;
      state.candidate.email = email;
      state.candidate.phoneNumber = phoneNumber;
      state.candidate.location = location;
      state.candidate.title = title;
      state.candidate.skills = skills;
      state.candidate.experience = experience;
      state.candidate.description = description;
      state.candidate.imageUrl = imageUrl;
    },

    emptyCandidateInfo: (state, action) => {
      state.candidate.firstName = "";
      state.candidate.lastName = "";
      state.candidate.email = "";
      state.candidate.phoneNumber = "";
      state.candidate.location = "";
      state.candidate.title = "";
      state.candidate.skills = [];
      state.candidate.experience = "";
      state.candidate.description = "";
      state.candidate.imageUrl = "";
    },

    setLoader: (state, action) => {
      state.login.isLoading = action.payload;
    },
  },
});
