import { Request, Response } from "express";
import RoleAccessService from "../../../services/role_access/roleAccess.class";
import GuestService from "../../../services/guests/guest.class";

// get role access of the logged in user
const getUserRoleAccess = async (req: Request, res: Response) => {
	try {
    const user: any = req.user;
    const guestData: any = await new GuestService().getGuestByID(user.id);
    if (guestData) {
      const roleAccessData = await new RoleAccessService().getRoleAccessByID(guestData.role);
      if (roleAccessData) {
        return res.status(200).send({
          message: "role access data",
          role: roleAccessData
        });
      } else {
        return res.status(404).send({
          message: "role access not found",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getRoleAccessByID = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "id is required",
      });
    }
    const roleAccessData = await new RoleAccessService().getRoleAccessByID(req.params.id);
    if (!roleAccessData) {
      return res.status(404).send({
        message: "role access not found",
      });
    }
    res.status(200).send({
      message: "role access found",
      roleAccess: roleAccessData,
    });

  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const createRoleAccess = async (req: Request, res: Response) => {
  try {
    const roleAccessData = await new RoleAccessService().createRoleAccess(req.body);
    if (!roleAccessData) {
      return res.status(400).send({
        message: "role access not created",
      });
    }
    res.status(200).send({
      message: "role access created",
      roleAccess: roleAccessData,
    });

  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updateRoleAccess = async (req: Request, res: Response) => {
  try {
    const roleAccessData = await new RoleAccessService().updateRoleAccess(req.params.id, req.body);
    if (!roleAccessData) {
      return res.status(400).send({
        message: "role access not updated",
      });
    }
    res.status(200).send({
      message: "role access updated",
      roleAccess: roleAccessData,
    });

  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const deleteRoleAccess = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "id is required",
      });
    }
    const roleAccessData = await new RoleAccessService().deleteRoleAccess(req.params.id);
    if (!roleAccessData) {
      return res.status(400).send({
        message: "role access not deleted",
      });
    }
    res.status(200).send({
      message: "role access deleted",
      roleAccess: roleAccessData,
    });

  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  getUserRoleAccess,
  getRoleAccessByID,
  createRoleAccess,
  updateRoleAccess,
  deleteRoleAccess,
};