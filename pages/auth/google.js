import React, { Component, useState, useEffect } from "react";
import router from "next/router";
import Loader from "../../components/Spinner";
import { getGoogleUser } from "../../api/auth";

function GoogleAuthCallback() {
  useEffect(() => {
    let accessToken = "";
    if (router && router.query.access_token) {
      accessToken = router.asPath.replace("/auth/google?", "");
      getGoogleUser(accessToken, router.query.access_token).then((data) => {
        if (data) {
          console.log(`data`, data);
          router.push("/admin/dashboard");
        }
      });
    }
  });

  return <Loader />;
}

export default GoogleAuthCallback;
