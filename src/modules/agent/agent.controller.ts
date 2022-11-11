import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../interfaces';
import GuestService from './agent.service';
import { PropertyRequiredError, UnexpectedError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../commen/exceptions/exceptions.class";

// get logged in guest
const getGuest = async (req: Request, res: Response, next: NextFunction) => {
  req.log = {...req.log, event: "get logged in guest", error: false, message: "success"};
  const user = req.user as IUser;
  const guestData:any = await new GuestService().getGuestByID(user.id);
  if (guestData.error) throw new NotFoundError("guest not found");
  res.status(200).send({ message: 'Guest found', guest: guestData.guest });
  next();
}

const getGuestByID = async (req: Request, res: Response, next: NextFunction) => {
  const guest: any = await new GuestService().getGuestByID(req.params.id);
  if (guest.error) throw new NotFoundError("error getting guest");
  if (!guest.guest) throw new NotFoundError("guest not found");
  res.status(200).send({ message: "guest found", guest: guest.guest });
  next();
}

const getGuests = async (req: Request, res: Response, next: NextFunction) => {
  const guests: any = await new GuestService().getGuests();
  if (guests.error) throw new NotFoundError("error getting guests");
  if (!guests.guest) throw new NotFoundError("guests not found");
  res.status(200).send({ message: "guests found", guests: guests.guest });
  next();
}

const updateGuest = async (req: Request, res: Response, next: NextFunction) => {
  const guest: any = await new GuestService().updateGuest(req.params.id, req.body);
  if (guest.error) throw new ResourceNotUpdatedError("error updating guest");
  res.status(200).send({ message: "guest updated", guest: guest.guest });
  next();
}

const deleteGuest = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) throw new PropertyRequiredError("id");
  const guest: any = await new GuestService().deleteGuest(req.params.id);
  if (guest.error) throw new UnexpectedError("error deleting guest");
  res.status(200).send({ message: "guest deleted", guest: guest.guest });
  next();
}

export default {
  getGuest,
  getGuests,
  getGuestByID,
  updateGuest,
  deleteGuest,
};