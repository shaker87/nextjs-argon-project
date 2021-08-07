import { getSession, session } from "next-auth/client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

import React from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import Router from "next/router";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import BasicHeader from "components/Headers/BasicHeader.js";

// import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return null;

  console.log(`session`, session);
  const sessionString = JSON.stringify(session)

  return (
    <>
      <BasicHeader title="Test Page for Session" lead="" />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="10">
            <div className="pricing card-group flex-column flex-md-row mb-3">
              <Card className="card-pricing border-0 text-left mb-4">

                <CardBody className="px-lg-7">
                <center><h1>Next-Auth Sessions</h1></center>

                <h2>Client Side</h2>
                <p>
                On client pages - include <br/>
<h3>{`import { useSession } from "next-auth/client";`}<br/></h3>
and then load session in function as follows <br/>
<h3>{`  const [session, loading] = useSession();`}</h3>                
                </p>

                <h2>Server Side</h2>
                <p>
                On client pages - include <br/>
<h3>{`import { getSession } from "next-auth/client";`}<br/></h3>
and then load session in function as follows <br/>
<h3>{`  const session = await getSession();`}</h3>                
                </p>
                <p>
                Next-Auth session information set in /pages/api/auth/[...nextauth].js file under callbacks.
                </p>
                <p>
                For more information see this page pages/test.jsx and also <a href="">Next-Auth documentation</a>
                </p>

<hr/>


<p> </p>

                  <center><h1>Example Session Information</h1></center>
                  <p></p>

<h3>The session variable (string) is as follows:<br/></h3>
{sessionString}<br/>
<hr/>
<h3>The session variable (object) elements can be referenced as follows:</h3>
                  {!session && <Link href="/api/auth/signin">Login</Link>}
                  You are <b>{session ? "currently" : "not"}</b> logged in.
                  <p></p>

                  {session && (
                    <>
                      session.user.name: {session.user.name} <br />
                      session.user.email: {session.user.email} <br />
                      session.id: {session.id} <br />
                      session.jwt: {session.jwt} <br />
                    </>
                  )}
                  <p></p>
                  {!session && <Link href="/api/auth/signin">Login</Link>}
                  {session && <Link href="/api/auth/signout">Logout</Link>}
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   console.log(`session_test3`, session);
//   if (!session) {
//     console.log("no session test3");
//     // return {
//     //     redirect: {
//     //     destination: "/auth",
//     //     permanent: false,
//     //   },
//     // };
//   }

//   return {
//     props: { session },
//   };
// }
ProfilePage.layout = Admin;

export default ProfilePage;
