import { Request, Response } from 'express';
import GuestService from '../../services/guests/guest.class';

// get logged in guest
const getGuest = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;
    if (!user) {
      return res.status(400).send({
        message: 'user not found',
      });
    }
    const guestData:any = await new GuestService().getGuestByID(user.id);
    if (guestData.error) {
      return res.status(400).send({
        message: 'guest not found',
      });
    }
    res.status(200).json({
      message: 'Guest found',
      guest: guestData.guest,
    });

  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getGuestByID = async (req: Request, res: Response) => {
  try {
    const guest: any = await new GuestService().getGuestByID(req.params.id);
    if (guest.error) {
      return res.status(400).send({
        message: 'error getting guest',
      });
    }
    if (!guest.guest) {
      return res.status(404).send({
        message: "guest not found",
      });
    }
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
    const guests: any = await new GuestService().getGuests();
    if (guests.error) {
      return res.status(400).send({
        message: 'error getting guests',
      });
    }
    if (!guests.guest) {
      return res.status(404).send({
        message: "guests not found",
      });
    }
    
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
    const guest: any = await new GuestService().updateGuest(req.params.id, req.body);
    if (guest.error) {
      return res.status(400).send({
        message: 'error updating guest',
      });
    }
    res.status(200).send({
      message: "guest updated",
      guest: guest.guest,
    });
    
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const deleteGuest = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "id can not be empty!",
      });
    }
    const guest: any = await new GuestService().deleteGuest(req.params.id);
    if (guest.error) {
      return res.status(400).send({
        message: 'error deleting guest',
      });
    }

    res.status(200).send({
      message: "guest deleted",
      guest: guest.guest,
    });
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