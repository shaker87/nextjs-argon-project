import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Identifier",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };
        // console.log(`credentials`, credentials);
        const user1 = JSON.stringify(credentials);
        const user2 = user1.replace("email", "identifier");
        const user3 = JSON.parse(user2);

        const user = await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, user3)
          .then((res) => {
            // console.log("res", res.data);
            return res.data;
          })
          .catch((err) => {
            console.log("err", err);
          });

        // const userj = JSON.stringify(user);
        // console.log("userj", userj);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  debug: true,
  callbacks: {
    // Getting the JWT token from API response
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.id;
        // The following allows for different methods per login method
        if (account.type === "credentials") {
          token.id = user.user.id;
          token.name = user.user.username;
          token.email = user.user.email;
        }
        //   console.log("jwt-token", token);
        // console.log("user-token", user);
        // console.log("account", account);

        //token.id = user.user.id;
      }
      return Promise.resolve(token);
    },

    session: async (session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;
      //session.test = "Test Claire";
      return Promise.resolve(session);
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
