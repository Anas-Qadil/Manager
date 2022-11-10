import express from 'express';
import auth from './authentification/index'
import permissions from './authorization/permissions'
import roleAccess from './authorization/role_access'
import guests from './guest/index'
import passport from 'passport';
import guestRole from "../routes/authorization/guest_role";
import errorHandler from '../middlewares/error';
import log from '../middlewares/log';

const passportJWTSignIn    = passport.authenticate("jwt", { session: false });
const router = express.Router();

// handle all authentification related routes
router.use('/api/v1/auth', auth, log);

router.use(passportJWTSignIn);
// handle all permissions related routes
router.use('/api/v1/permissions', permissions, log);

// handle all role access related routes
router.use("/api/v1/role", roleAccess, log);

// handle all guests related routes
router.use("/api/v1/guest-role", guestRole, log);

// handle all guest related routes
router.use("/api/v1/guest", guests, log);

// error handling middleware
router.use((_, res) => {
  res.status(404);
  res.send({ message: "route not found" });
});

router.use(errorHandler, log);


export default router;