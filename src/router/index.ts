import express from 'express';
import auth from '../modules/authentification/auth.Route';
import permissions from '../modules/authorization/permissions/permission.route'
import roles from '../modules/authorization/roles/role.route'
import agent from '../modules/agent/agent.route'
import passport from 'passport';
import agentRole from "../modules/authorization/agent-role/agentRole.route";
import errorHandler from '../commen/exceptions/error.handler';
import log from '../commen/logger/logger.service';

const passportJWTSignIn    = passport.authenticate("jwt", { session: false });
const router = express.Router();

// handle all authentification related routes
router.use('/api/v1/auth', auth, log);

router.use(passportJWTSignIn);
// handle all permissions related routes
router.use('/api/v1/permissions', permissions, log);

// handle all role access related routes
router.use("/api/v1/role", roles, log);

// handle all guests related routes
router.use("/api/v1/agent-role", agentRole, log);

// handle all guest related routes
router.use("/api/v1/agent", agent, log);

// error handling middleware
router.use((_, res) => {
  res.status(404);
  res.send({ message: "route not found" });
});

router.use(errorHandler, log);


export default router;