import express from 'express';
import { signInController } from '../../controllers/authentification/sign-in';
import { signInMiddleware } from '../../middlewares/authentification/sign-in';
import "../../configs/passport";
import passport from "passport"

const passportLocalSignIn  = passport.authenticate("localSignIn", { session: false });

// set up router
const router = express.Router();

// set up routes
router.post('/sign-in', passportLocalSignIn , signInMiddleware, signInController);

export default router;