import React, { useState, useContext } from "react";
import { withRouter } from "next/router";
//import Loader from "components/Spinner";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
//import { checkAuthenticatedUser } from "../api/auth";
//import { UserProvider, UserContext } from "../context/auth-context-global.js";

function Admin({ router, children, ...props }) {
  //const context = useContext(UserContext);
  const [user, setUser1] = useState(context);

  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (router.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };
  const getNavbarTheme = () => {
    return router.pathname.indexOf("admin/alternative-dashboard") === -1
      ? "dark"
      : "light";
  };

  const LayoutComponent = () => {
    //const user = React.useContext(UserProvider);

    return (
      <UserContext.Consumer>
        {(user) => {
          {
            /* console.log("gd_user", user); */
          }
          {
            /* console.log("user1b", user1); */
          }
          return (
            <>
              <div>Test User from Admin</div>
              <Sidebar
                routes={routes}
                toggleSidenav={toggleSidenav}
                sidenavOpen={sidenavOpen}
                logo={{
                  innerLink: "/",
                  imgSrc: require("assets/img/brand/Logo-Black-Text-300h.svg"),
                  imgAlt: "...",
                }}
              />
              <div className="main-content">
                <AdminNavbar
                  theme={getNavbarTheme()}
                  toggleSidenav={toggleSidenav}
                  sidenavOpen={sidenavOpen}
                  brandText={getBrandText(router.pathname)}
                />
                {children}
                <AdminFooter />
              </div>
              {sidenavOpen ? (
                <div className="backdrop d-xl-none" onClick={toggleSidenav} />
              ) : null}
            </>
          );
        }}
      </UserContext.Consumer>
    );
  };
  //console.log(`testuser`, user);
  // console.log(`testname`, testname);

  const userContext = React.useContext(UserProvider);
  // console.log("gd_userContext", userContext);

  return (
    <UserProvider>
      <LayoutComponent />
    </UserProvider>
  );
}

export default withRouter(Admin);
