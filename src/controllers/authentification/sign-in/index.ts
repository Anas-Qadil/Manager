import { Request, Response } from "express";
import { generateToken } from "../../../configs/passport/passport.service";

const signInController = (req: Request, res: Response) => {
  try {
    const {error, token} = generateToken(req.user);
    if (error) return res.status(500).json({ message: "auth token generation failed" });
    res.status(200).json({
      message: "Signed in successfully",
      token,
      user: req.user
    });
  } catch (e) {
    res.status(500).send({ message: "Internal server error." });
  }
};

export {
  signInController
}