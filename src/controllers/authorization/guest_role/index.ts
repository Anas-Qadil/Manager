import { Request, Response } from "express"
import GuestRoleService from "../../../services/role_access/guestRole.class";

// get logged in user role
const getGuestRole = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;
    const guestRoleData = await new GuestRoleService().getGuestRoleByID(user.id);
    if (!guestRoleData) {
      return res.status(404).send({
        message: "guest role not found",
      });
    }
    res.status(200).send({
      message: "guest role found",
      data: guestRoleData,
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getGuestByID = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "id is required",
      });
    }
    const guestRoleData = await new GuestRoleService().getGuestRoleByID(req.params.id);
    if (!guestRoleData) {
      return res.status(404).send({
        message: "guest role not found",
      });
    }
    res.status(200).send({
      message: "guest role found",
      data: guestRoleData,
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getAllGuestRoles = async (req: Request, res: Response) => {
  try {
    const guestRoleData = await new GuestRoleService().getAllGuestRoles();
    if (!guestRoleData) {
      return res.status(404).send({
        message: "guest roles not found",
      });
    }
    res.status(200).send({
      message: "guest roles found",
      data: guestRoleData,
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const createGuestRole = async (req: Request, res: Response) => {
  try {
    const guestRoleData = await new GuestRoleService().createGuestRole(req.body);
    if (!guestRoleData) {
      return res.status(404).send({
        message: "guest role not created",
      });
    }
    res.status(201).send({
      message: "guest role created",
      data: guestRoleData,
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updateGuestRole = async (req: Request, res: Response) => {
  try {
    const guestRoleData = await new GuestRoleService().updateGuestRole(req.params.id, req.body);
    if (!guestRoleData) {
      return res.status(404).send({
        message: "guest role not updated",
      });
    }
    res.status(200).send({
      message: "guest role updated",
      data: guestRoleData,
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const deleteGuestRole = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "id is required",
      });
    }
    const guestRoleData = await new GuestRoleService().deleteGuestRole(req.params.id);
    if (!guestRoleData) {
      return res.status(404).send({
        message: "guest role not deleted",
      });
    }
    res.status(200).send({
      message: "guest role deleted",
      data: guestRoleData,
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}


export default {
  createGuestRole,
  updateGuestRole,
  deleteGuestRole,
  getGuestRole,
  getAllGuestRoles,
  getGuestByID
};