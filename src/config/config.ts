//Openshift inner route

const config = {
  elasticsearch: {
    url: "",
  },
  saml: {
    cert: "./src/config/saml.pem",
    entryPoint:
      "https://trial-7044238.okta.com/app/trial-7044238_reactexpresssamlintegration_1/exk4s7qfefxut9FAo697/sso/saml",
    issuer: "http://localhost:1337",
    options: {
      failureRedirect: "/login",
      failureFlash: true,
    },
  },
  server: {
    port: 1337,
  },
  session: {
    resave: false,
    secret: "STeyLO8GNmsVnyXwoQMchwJnDjmiEBQP",
    saveUninitialized: true,
  },
};

export default config;
