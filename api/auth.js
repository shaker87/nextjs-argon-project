import axios from "axios";
import Router from "next/router";
// import { Profiler } from "react";
// import { Polyfill } from "reactstrap";

// const API_URL = "https://api-test.prismvu.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (username, email, password) => {
  try {
    const registerUrl = `${API_URL}/auth/local/register`;
    const res = await axios.post(registerUrl, { username, email, password });
    const resData = res.data;

    let response = {};
    if (res.statusCode === "400") {
      response.message = "User Already exists";
      response.success = 0;
    } else {
      response.message = "Success";
      response.success = 1;
      response.jwt = res.data.jwt;
    }

    console.log(`res`, res);
    console.log(`resData`, resData);

    if (res) return response;
  } catch (e) {}
};

// Changed to res resData pattern and then created user localStorage and var
export const loginUser = async (identifier, password) => {
  let response = {};
  try {
    const loginUrl = `${API_URL}/auth/local/`;
    const res = await axios.post(loginUrl, { identifier, password });
    const resData = res.data;

    if (res && res.status === 400) {
      response.message = "Identifier or password invalid";
      response.success = 0;
    } else {
      response.message = "Success";
      response.success = 1;
      response.jwt = resData.jwt;
      localStorage.setItem("user", JSON.stringify(resData.user));
      localStorage.setItem("jwt", resData.jwt);
    }

    if (res) return response;
  } catch (e) {
    response.success = 0;
    return response;
  }
};

// TODO: revisit
export const forgotPassword = async (identifier, password) => {
  let response = {};
  try {
    const loginUrl = `${API_URL}/auth/local/`;
    const user = await axios.post(loginUrl, { identifier, password });
    console.log(user.statusCode);

    console.log(user);
    console.log(user.status);

    if (user && user.status === 400) {
      response.message = "Identifier or password invalid";
      response.success = 0;
    } else {
      response.message = "Success";
      response.success = 1;
      response.jwt = user.data.jwt;
      localStorage.setItem("user", JSON.stringify(user));
    }

    if (user) return response;
  } catch (e) {
    response.success = 0;
    return response;
  }
};

export const checkAuthenticatedUser = async (jwt) => {
  const checkAuthUrl = `${API_URL}/users/me`;
  let response = {};
  try {
    const isUser = await axios.get(checkAuthUrl, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (isUser && isUser.statusCode === 401) {
      response.success = 0;
    } else {
      response.success = 1;
      localStorage.setItem("user", JSON.stringify(isUser.data));
    }

    return response;
  } catch (e) {
    response.success = 0;
    return response;
  }
};

export const getGoogleUser = async (accessToken, userid) => {
  try {
    let userData = {};
    const user = await axios
      .get(`${API_URL}/connect/google/callback?${accessToken}`)
      .then((data) => (userData = data.data))
      .catch((e) => console.log(e));
    const profile = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userid}`
    );

    if (userData && profile && profile.data && profile.status === 200) {
      let user = userData.user;
      user.picture = profile.data.picture ? profile.data.picture : "";

      if (profile.data.name) user.username = profile.data.name;

      localStorage.setItem("profile", JSON.stringify(profile.data));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userPicture", user.picture);
      localStorage.setItem("jwt", userData.jwt);

      return {
        success: 1,
      };
    }
  } catch (e) {
    console.log(e);
    return { success: 0 };
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  localStorage.removeItem("profile");
  localStorage.removeItem("userPicture");
  Router.push("/auth/login");
};
