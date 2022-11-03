import express from 'express';
import { signInController } from '../../controllers/authentification/sign-in';
import { signInMiddleware } from '../../middlewares/authentification/sign-in';
import { signUpController } from '../../controllers/authentification/sign-up';
import { signUpMiddleware } from '../../middlewares/authentification/sign-up';
import "../../configs/passport";
import passport from "passport"

const passportLocalSignIn  = passport.authenticate("localSignIn", { session: false });
const passportJWTSignIn    = passport.authenticate("jwt", { session: false });
const router = express.Router();

// set up routes
router.post('/sign-in', passportLocalSignIn, signInMiddleware, signInController);
router.post("/authorize", passportJWTSignIn, signInMiddleware, signInController);
router.post("/sign-up", passportJWTSignIn, signUpMiddleware, signUpController);

export default router;