import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local"
import { isCredentialsValid } from "./passport.utils";
import { isUserExist, comparePassword } from "./passport.service";
import { IUser } from "../../interfaces";

passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
  }, async (payload, done) => {
    try {
      const user: IUser | null = await isUserExist(payload.username);
      if (!user) {
        return done(null, { error: { code: 404, message: "account not found or disabled" } });
      }
      if (user.password)
        delete user.password;
      return done(null, user);
    } catch (e: any) {
      done(e, false)
    }
  })
);

passport.use('localSignIn', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username: string, password: string, done) => {
  try {
    // check if for special characters
    const { error, message } = isCredentialsValid(username, password);
    if (error) {
      return done(null, { error: { code: 400, message } });
    }
    // check if user exist
    const user: IUser | null = await isUserExist(username);
    if (!user) {
      return done(null, { error: { code: 404, message: "account not found or disabled" } });
    }
    // Check if password correct
    if (!user.password) return done(null, { error: { code: 404, message: "account not found or disabled" } });
    const isPasswordCorrect = await comparePassword(user.password, password);
    if (!isPasswordCorrect) {
      return done(null, { error: { code: 400, message: "password is incorrect" } });
    }
    // Otherwise, return the user    
    return done(null, user);
    } catch (e: any) {
      done(e, null, e.message);
    }
  }
)); 
