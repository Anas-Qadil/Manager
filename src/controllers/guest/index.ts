import { Request, Response } from 'express';
import GuestService from '../../services/guests/guest.class';

// get logged in guest
const getGuest = async (req: Request, res: Response) => {
  try {
    res.status(200).send("get logged in guest");
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getGuestByID = async (req: Request, res: Response) => {
  try {
    const guest = await new GuestService().getGuestByID(req.params.id);
    res.status(200).send({
      message: "guest found",
      guest: guest.guest,
    });
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getGuests = async (req: Request, res: Response) => {
  try {
    const guests = await new GuestService().getGuests();
    res.status(200).send({
      message: "guests found",
      guests: guests.guest,
    });
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updateGuest = async (req: Request, res: Response) => {
  try {
    res.status(200).send("update guest by id");
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const deleteGuest = async (req: Request, res: Response) => {
  try {
    res.status(200).send("delete guest by id");
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export {
  getGuest,
  getGuests,
  getGuestByID,
  updateGuest,
  deleteGuest,
};