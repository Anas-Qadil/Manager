import prisma from "../../prisma/connection";
import { IPermission } from "../../interfaces";

export class PermissionsService {
	public async getPermissionByID(id: string) {
    try {
      if (!id) return null;
      return await prisma.permissions.findUnique({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return null;
    }
  }

  public async getUserPermissions(id: string) {
    try {
      if (!id) return null;
      const data: any = await prisma.user_role.findFirst({
        where: {
          guestID : id,
        },
        select: {
          role: {
            select: {
              permissions: {
                select: {
                  name: true,
                  description: true,
                  id: true,
                },
              }
            },
          },
        },
      });

      const permissions: any = [];
      data.role.map((role: any) => {
        const permission = role.permissions.map((permission: any) => {
          return permission;
        });
        permissions.push(...permission);
      });
      return permissions;
    } catch (e) {
      return null;
    }
  }

  public async createPermission(data: any) {
    try {
      return await prisma.permissions.create({
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  public async updatePermission(id: string, data: IPermission) {
    try {
      if (!id) return null;
      const archived = await prisma.permissions.update({
        where: {
          id: id,
        },
        data: {
          archive: true,
        },
      });

      if (archived) {
        if (!data.name) data.name = archived.name || "";
        if (!data.description) data.description = archived.description || "";
        return await prisma.permissions.create({
          data: data
        });
      }
    } catch (e) {
      return null;
    }
  }

  public async deletePermission(id: string) {
    try {
      if (!id) return null;
      return await prisma.permissions.update({
        where: {
          id: id,
        },
        data: {
          archive: true,
        },
      });
    } catch (e) {
      return null;
    }
  }
}
