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
      return await prisma.permissions.findMany({
        where: {
          id: id,
          archive: false,
        },
      });
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
      return await prisma.permissions.update({
        where: {
          id: id,
        },
        data: data
      });;
    } catch (e) {
      return null;
    }
  }

  public async deletePermission(id: string) {
    try {
      return await prisma.permissions.delete({
        where: {
          id: id,
        }
      });
    } catch (e) {
      return null;
    }
  }
}
