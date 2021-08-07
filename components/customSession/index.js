import React from "react";
import { useSession, getSession } from "next-auth/client";

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(`session1`, session);
  //console.log(`user1`, user);
  if (!session) {
    console.log("ServerSide - No");
  } else {
    console.log("ServerSide - Yes");
  }

  if (!session) {
    // return {
    //   redirect: {
    //     destination: "/auth",
    //     permanent: false,
    //   },
    // };
  }

  return {
    props: { session },
  };
}

export default getServerSideProps;
