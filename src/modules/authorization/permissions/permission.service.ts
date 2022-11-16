import prisma from "../../../../prisma/connection";
import { IPermission } from '../../../commen/interfaces'

export class PermissionsService {
	public async getPermissionByID(id: string) {
    try {
      return await prisma.agentPermissions.findUnique({
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
      const data: any = await prisma.backOfficeRoles.findFirst({
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
      return await prisma.agentPermissions.create({
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  public async updatePermission(id: string, data: IPermission) {
    try {
      const archived = await prisma.agentPermissions.update({
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
        return await prisma.agentPermissions.create({
          data: data
        });
      }
    } catch (e) {
      return null;
    }
  }

  public async deletePermission(id: string) {
    try {
      return await prisma.agentPermissions.update({
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

  public async hasPermission(id: string, permission: string) {
    try {
      return await prisma.agentPermissions.count({
        where: {
          name: permission,
          role:{
            some:{
              user_role_:{
                some:{
                  guestID:id
                }
              }
            }
          }
        },
      });
    } catch (e) {
      return false;
    }
  }
}
