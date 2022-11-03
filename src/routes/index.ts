import express, { Express } from 'express';
import auth from './authentification/index'
import permissions from './authorization/permissions'
import roleAccess from './authorization/role_access'

const router = express.Router();

// handle all authentification related routes
router.use('/api/auth', auth);

// handle all permmision related routes
router.use("/api/permissions", permissions);

// handle all role access related routes
router.use("/api/role-access", roleAccess);

// error handling middleware
router.use((_, res) => {
  res.status(404).send('Not Found');
});

export default router;