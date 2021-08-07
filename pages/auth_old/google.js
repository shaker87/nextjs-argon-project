import React, { Component } from "react";
import router from "next/router";
import Loader from "../../components/Spinner";
import { getGoogleUser } from "../../api/auth";

class GoogleAuthCallback extends Component {
  async componentDidMount() {
    let accessToken = "";
    if (router && router.query.access_token) {
      accessToken = router.asPath.replace("/auth/google?", "");
      const data = await getGoogleUser(accessToken, router.query.access_token);
      console.log("DATA", data);
      if (data && data.success) {
        console.log("REACHED AFTER SUCCESS");
        router.push("/surveys/surveys");
      }
    }
  }

  render() {
    return <Loader />;
  }
}

export default GoogleAuthCallback;
