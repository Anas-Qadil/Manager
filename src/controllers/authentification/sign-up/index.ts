import { Request, Response } from "express";
import GuestService from "../../../services/guests/guest.class";

const signUpController = async (req: Request, res: Response) => {
  try {
    const guest: any = await new GuestService().createGuest(req.body);
    if (guest.errorCode) {
      if (guest.errorCode === "P2002") return res.status(400).json({ message: "Username already exists" });
      return res.status(400).json({ message: "failed creating guest" });
    }
    res.status(200).json({
      message: "Signed up successfully",
      guest: guest.guest,
    });
  } catch (e) {
    res.status(500).send({ message: "Internal server error." });
  }
}

export {
  signUpController
}