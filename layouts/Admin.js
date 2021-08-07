import React, { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import { useSession, getSession } from "next-auth/client";


//import Loader from "components/Spinner";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

// TODO: should we checkAuthenticatedUser as follows?
//import { checkAuthenticatedUser } from "../api/auth";

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log("context", context);
  return {
    props: { session },
  };
}

function Admin({ router, children, ...props }) {
  const [session, loading] = useSession();

  // TODO: [SWOT-28] if you login and logout - then go to /admin/dashboard you will see flash of login screen before it redirects to login page.  How do we eliminate the flash?  What is the best way to protect everything using admin layout?

  useEffect(() => {
    if (typeof window !== "undefined" && loading) return null;
    if (!session) {
      router.push("/auth/login");
    }
  });

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
    return (
      <>
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
  };

  return <LayoutComponent />;
}

export default withRouter(Admin);
