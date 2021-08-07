import React, { useContext, createContext, useState } from "react";
import Admin from "layouts/Admin.js";

//import { UserProvider, UserContext } from "../../context/auth-context-global";

function Test() {
  // Set usercontext

  const context = useContext(UserContext);
  const [usercontext, setUsercontext] = useState(context.user);
  console.log(context);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };

  const v = context.setEmail("Test 123");
  //let v1 = context.setUsername("Test 123");

  return (
    <UserProvider>
      <div align="center">
        <h3>ID: {UserContext.id}</h3>
        <h3>Name: {context.username}</h3>
        <h3>Email: {context.email}</h3>
        <h3>Token: {UserContext.token}</h3>
        <h3>isLoggedin1: {UserContext.auth}</h3>
      </div>

      <div className="input-item">
        <label className="label">Update Name: </label>
        <input
          className="input"
          onChange={(e) => context.setUsername(e.target.value)}
        />
      </div>
    </UserProvider>
  );
}

Test.layout = Admin;

export default Test;
