import express, { Express } from 'express';
import auth from './authentification/index'
import permissions from './authorization/permissions'
import roleAccess from './authorization/role_access'
import guests from './guest/index'

const router = express.Router();

// handle all authentification related routes
router.use('/api/v1/auth', auth);

// handle all permmision related routes
router.use("/api/v1/permissions", permissions);

// handle all role access related routes
router.use("/api/v1/role-access", roleAccess);

// handle all guest related routes
router.use("/api/v1/guest", guests);

// error handling middleware
router.use((_, res) => {
  res.status(404).send('Not Found');
});

export default router;