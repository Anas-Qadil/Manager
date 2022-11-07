import prisma from "../../prisma/connection";

export class PermissionsService {
	public async getPermissionByID(id: string) {
    try {
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

  public async updatePermission(id: string, data: any) {
    try {
      const archived = await prisma.permissions.update({
        where: {
          id: id,
        },
        data: {
          archive: true,
        },
      });
      if (archived) {
        return await prisma.permissions.update({
          where: {
            id: id,
          },
          data: data
        });
      }
    } catch (e) {
      return null;
    }
  }

  public async deletePermission(id: string) {
    try {
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
