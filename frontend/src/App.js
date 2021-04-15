import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

//Pages
import { StartPage } from "./pages/StartPage";
import { About } from "./pages/About";
import { Candidates } from "./pages/Candidates";
import { SignUpForm } from "./pages/SignUpForm";
import { LoginForm } from "./pages/LoginForm";
import { LoginPage } from "./pages/LoginPage";
import { ContactForm } from "./pages/ContactForm";
import { GDPR } from "./pages/GDPR";
import { NotFound } from "./pages/NotFound";

//Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

//Reducers
import { candidate } from "./reducers/candidate";

const reducer = combineReducers({ candidate: candidate.reducer });
const store = configureStore({ reducer });

// APP --------------------------------------
export const App = () => {

  //Makes the page scroll to top on every new page rendering
  const OnPageChange = () => {   
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <OnPageChange />
        <Header />
        <Switch>
          <Route path="/" exact>
            <StartPage />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/contact">
            <ContactForm />
          </Route>
          <Route path="/candidates">
            <Candidates />
          </Route>
          <Route path="/gdpr">
            <GDPR />
          </Route>
          <Route path="/:id/candidate">
            <LoginPage />
          </Route>
          <Route path="/404" exact>
            <NotFound />
          </Route>
          <Redirect to="/404" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};
