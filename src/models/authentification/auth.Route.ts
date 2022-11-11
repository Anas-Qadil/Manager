import express from 'express';
import { signInController, signUpController } from './auth.controller';
import { signInMiddleware, signUpMiddleware } from './auth.middleware';
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