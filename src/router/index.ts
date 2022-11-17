import express from 'express';
import auth from '../modules/authentification/auth.Route';
import agentPermissions from '../modules/authorization/permissions/permission.route'
import roles from '../modules/authorization/roles/role.route'
import agent from '../modules/agent/agent.route'
import passport from 'passport';
import agentRole from "../modules/authorization/agent-role/agentRole.route";
import errorHandler from '../commen/exceptions/error.handler';
import log from '../commen/logger/logger.service';
import userProfile from "../modules/userProfile/profile.route";
import company from "../modules/company/company.route";
import bankAccount from "../modules/bank/bank-account/bank.route";
import bankDoc from "../modules/bank/bank-docs/bankDoc.route";
import inscriptionDocs from "../modules/inscription-docs/iDocs.route";
import account from "../modules/account/account.route";
import user from "../modules/user/user.route";

const passportJWTSignIn    = passport.authenticate("jwt", { session: false });
const router = express.Router();

// handle all authentification related routes
router.use('/api/v1/auth', auth, log);

router.use(passportJWTSignIn);
// handle all permissions related routes
router.use('/api/v1/permissions', agentPermissions, log);

// handle all role access related routes
router.use("/api/v1/role", roles, log);

// handle all guests related routes
router.use("/api/v1/agent-role", agentRole, log);

// handle all guest related routes
router.use("/api/v1/agent", agent, log);

// handle all user profile related routes
router.use("/api/v1/user-profile", userProfile, log);

// handle all company related routes
router.use("/api/v1/company", company, log);

// handle all bank docs related routes
router.use("/api/v1/bank-docs", bankDoc, log);

// handle all bank account related routes
router.use("/api/v1/bank-account", bankAccount, log);

// handle all inscription docs related routes
router.use("/api/v1/inscription-docs", inscriptionDocs, log);

// handle all account related routes
router.use("/api/v1/account", account, log);

// handle all user related routes
router.use("/api/v1/user", user, log);

// error handling middleware
router.use((_, res) => {
  res.status(404);
  res.send({ message: "route not found" });
});

router.use(errorHandler, log);


export default router;