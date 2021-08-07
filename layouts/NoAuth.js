import React from "react";
import { withRouter } from "next/router";
// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

function Auth({ children }) {
  React.useEffect(() => {
    document.body.classList.add("bg-default");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  });
  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        {children}
      </div>
      <AuthFooter />
    </>
  );
}

export default withRouter(Auth);
