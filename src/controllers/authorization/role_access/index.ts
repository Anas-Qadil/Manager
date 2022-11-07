import { Request, Response } from "express";
import RoleService from "../../../services/role_access/role.class";
import GuestService from "../../../services/guests/guest.class";

// get role  of the logged in user
const getUserRole = async (req: Request, res: Response) => {
	try {
    const user: any = req.user;
    const guestData: any = await new GuestService().getGuestByID(user.id);
    if (guestData) {
      const roleData = await new RoleService().getRoleByID(guestData.role);
      if (roleData) {
        return res.status(200).send({
          message: "role  data",
          role: roleData
        });
      } else {
          return res.status(404).send({
            message: "role  not found",
          });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getAllRole = async (req: Request, res: Response) => {
  try {
    const roleData = await new RoleService().getAllRole();
    console.log(roleData);
    if (roleData) {
      return res.status(200).send({
        message: "role  data",
        role: roleData
      });
    } else {
        return res.status(404).send({
          message: "role  not found",
        });
      }
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}


const getRoleByID = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "id is required",
      });
    }
    const roleData = await new RoleService().getRoleByID(req.params.id);
    if (!roleData) {
      return res.status(404).send({
        message: "role  not found",
      });
    }
    res.status(200).send({
      message: "role  found",
      role: roleData,
    });

  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const createRole = async (req: Request, res: Response) => {
  try {
    const data: any = req.body;
    const user: any = req.user;
    data.creatorID = user.id;
    const roleData = await new RoleService().createRole(req.body);
    if (!roleData) {
      return res.status(400).send({
        message: "role  not created",
      });
    }
    res.status(200).send({
      message: "role  created",
      role: roleData,
    });

  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updateRole = async (req: Request, res: Response) => {
  try {
    const roleData = await new RoleService().updateRole(req.params.id, req.body);
    if (!roleData) {
      return res.status(400).send({
        message: "role  not updated",
      });
    }
    res.status(200).send({
      message: "role  updated",
      role: roleData,
    });

  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const deleteRole = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "id is required",
      });
    }
    const roleData = await new RoleService().deleteRole(req.params.id);
    if (!roleData) {
      return res.status(400).send({
        message: "role  not deleted",
      });
    }
    res.status(200).send({
      message: "role  deleted",
      role: roleData,
    });

  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  getUserRole,
  getRoleByID,
  createRole,
  updateRole,
  deleteRole,
  getAllRole
};