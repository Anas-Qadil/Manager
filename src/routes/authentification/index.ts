import express from 'express';
import { signInController } from '../../controllers/authentification/sign-in';
import { signInMiddleware } from '../../middlewares/authentification/sign-in';
import { signUpController } from '../../controllers/authentification/sign-up';
import { signUpMiddleware } from '../../middlewares/authentification/sign-up';
import asyncHandler from 'express-async-handler';
import "../../configs/passport";
import passport from "passport"

const passportLocalSignIn  = passport.authenticate("localSignIn", { session: false });
const passportJWTSignIn    = passport.authenticate("jwt", { session: false });
const router = express.Router();

// [ROUTE] /api/v1/auth/sign-in
router.post('/sign-in', passportLocalSignIn, asyncHandler(signInMiddleware), asyncHandler(signInController));
router.post("/authorize", passportJWTSignIn, asyncHandler(signInMiddleware), asyncHandler(signInController));
router.post("/sign-up", passportJWTSignIn, signUpMiddleware, asyncHandler(signUpController));

export default router;