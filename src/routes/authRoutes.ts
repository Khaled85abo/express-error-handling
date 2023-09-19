import express, { Router } from "express";
import passport from "passport";
import config from "../config/config";
import logging from "../config/logging";

const router: Router = express.Router();
/** Passport & SAML Routes */
router.get(
  "/login",
  passport.authenticate("saml", config.saml.options),
  (req, res, next) => {
    return res.redirect("http://localhost:3000");
  }
);

router.post(
  "/login/callback",
  passport.authenticate("saml", config.saml.options),
  (req, res, next) => {
    return res.redirect("http://localhost:3000");
  }
);

router.get("/whoami", (req, res, next) => {
  if (!req.isAuthenticated()) {
    logging.info("User not authenticated");

    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    logging.info("User authenticated");
    logging.info(req.user);

    return res.status(200).json({ user: req.user });
  }
});
export default router;
