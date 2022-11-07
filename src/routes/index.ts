import express from 'express';
import auth from './authentification/index'
import permissions from './authorization/permissions'
import roleAccess from './authorization/role_access'
import guests from './guest/index'
import passport from 'passport';
import guestRole from "../routes/authorization/guest_role";

const passportJWTSignIn    = passport.authenticate("jwt", { session: false });
const router = express.Router();

// handle all authentification related routes
router.use('/api/v1/auth', auth);

router.use(passportJWTSignIn);
// handle all permissions related routes
router.use('/api/v1/permissions', permissions);

// handle all role access related routes
router.use("/api/v1/role", roleAccess);

// handle all guests related routes
router.use("/api/v1/guest-role", guestRole);

// handle all guest related routes
router.use("/api/v1/guest", guests);

// error handling middleware
router.use((_, res) => {
  res.status(404).send('Not Found');
});

export default router;