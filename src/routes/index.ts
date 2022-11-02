import express, { Express } from 'express';
import auth from './authentification/index'

const router = express.Router();

// handle all authentification related routes
router.use('/api/auth', auth);


// error handling middleware
router.use((_, res) => {
  res.status(404).send('Not Found');
});

export default router;