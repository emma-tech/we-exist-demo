import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import * as Icon from "react-feather";

//Reducers
import { candidate } from "reducers/candidate";

//Styling
import { PageWrapper, Text } from "../styling/GlobalStyling";

//Components
import { PageHeading } from "../components/PageHeading";
import { CandidateCard } from "../components/CandidateCard";
import { Loader } from "../components/Loader";

// CANDIDATES PAGE --------------------------------------
export const Candidates = () => {
  //const CANDIDATE_URL = "http://localhost:8080/candidates";
  const CANDIDATE_URL = "https://project-we-exist.herokuapp.com/candidates";
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const loader = useSelector((store) => store.candidate.login.isLoading);
  const dispatch = useDispatch();

  // SET allows creating collection of unique values - Using this to generate options for select menu
  const uniqueLocations = [
    ...new Set(candidates.map((candidate) => candidate.location).sort()),
  ];

  // Filtering candidates based on location
  const filterOnLocation = (value) => {
    if (value === "all") {
      setFilteredCandidates(candidates);
    } else {
      const filtered = candidates.filter(
        (candidate) => candidate.location === value
      );
      setFilteredCandidates(filtered);
    }
  };

  useEffect(() => {
    dispatch(candidate.actions.setLoader(true));

    fetch(CANDIDATE_URL)
      .then((response) => response.json())
      .then((json) => {
        setCandidates(json);
        setFilteredCandidates(json);
        dispatch(candidate.actions.setLoader(false));
      });
  }, [CANDIDATE_URL, dispatch]);

  return (
    <>
      <PageWrapper>
        <PageHeading title="Candidates" />
        <TextWrapper>
          <Text>
            Welcome to our candidates page! Here you will find awesome talents
            to hire in your team, or people looking for freelance opportunities
            and exiting new projects and collaborations.
          </Text>
        </TextWrapper>
        {loader && <Loader />}
        {!loader && (
          <>
            <FilteringBar>
              <SelectWrapper>
                <SelectMenu
                  name="location"
                  id="location"
                  onChange={(event) => filterOnLocation(event.target.value)}
                >
                  <option value="" hidden>
                    Location
                  </option>
                  <option value="all">All candidates</option>
                  {uniqueLocations.map((location) => {
                    return (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    );
                  })}
                </SelectMenu>
                <IconWrapper>
                  <Icon.MapPin color="#858181" size="22" />
                </IconWrapper>
              </SelectWrapper>
              <SearchWrapper>
                <SearchBar
                  type="text"
                  placeholder="Search..."
                  name="search"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
                <SearchButton>
                  <Icon.Search color="#858181" size="22" />
                </SearchButton>
              </SearchWrapper>
            </FilteringBar>
            <CardWrapper>
              {filteredCandidates
                .filter((candidate) => {
                  if (searchTerm === "") {
                    return candidate;
                  } else if (
                    candidate.description
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    candidate.skills
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    candidate.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return candidate;
                  } else {
                    return null;
                  }
                })
                .map((candidate) => {
                  return <CandidateCard key={candidate._id} {...candidate} />;
                })}
            </CardWrapper>
          </>
        )}
      </PageWrapper>
    </>
  );
};

// STYLING -----------------------------

const TextWrapper = styled.div`
  width: 90%;

  @media (min-width: 1024px) {
    width: 50%;
    text-align: center;
  }
`;

const CardWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 60px;

  @media (min-width: 1024px) {
    margin-top: 100px;
  }
`;

const FilteringBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 667px) {
    flex-direction: row;
    justify-content: space-evenly;
  }

  @media (min-width: 1024px) {
    width: 80%;
    justify-content: space-between;
  }
`;

// SEARCH INPUT -----------------------------
const SearchWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  margin: 10px 0;

  @media (min-width: 667px) {
    width: 40%;
  }

  @media (min-width: 1024px) {
    width: 30%;
  }

  @media (min-width: 1200px) {
    width: 25%;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 4px 0 0 4px;
  border: 1px #ccc6c6 solid;
  border-right: none;
  outline: none;
  font-family: "Montserrat";

  &::placeholder {
    color: #858181;
  }
`;

const SearchButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  border: 1px #ccc6c6 solid;
  border-left: none;
  border-radius: 0 4px 4px 0;
  height: 40px;
  width: 40px;
`;

// SELECT DROPDOWN MENU ---------------
const SelectWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  margin: 10px 0;

  @media (min-width: 667px) {
    width: 40%;
  }

  @media (min-width: 1024px) {
    width: 30%;
  }

  @media (min-width: 1200px) {
    width: 25%;
  }
`;

const SelectMenu = styled.select`
  width: 100%;
  height: 40px;
  outline: none;
  border: 1px #ccc6c6 solid;
  border-radius: 4px;
  color: #858181;
  background: #fff;
  padding-left: 5px;
  font-size: 16px;
  font-family: "Montserrat";

  option {
    font-size: 14px;
    font-family: "Montserrat";
  }
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  height: 40px;
  width: 40px;
`;
