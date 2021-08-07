import React, { useEffect, useState, useContext } from "react";
import Router from "next/router";

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [user2, setUser2] = useState("initial State 2");
  // Run initially - i.e. no dependencies []
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  // Run initially - i.e. no dependencies []
  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  // // This sets user context
  // const UserContext = React.createContext({
  //   id: {},
  //   token: "",
  //   name: "",
  //   email: "",
  //   isLoggedIn: false,
  // });

  console.log(`user_useUser`, user.id);
  console.log(`UserContext`, UserContext);
  // This sets context
  const AContext = React.createContext({
    token: "{user.id}",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    color2: "Blue",
  });

  return { user, user2, profile, AContext, UserContext };
}
