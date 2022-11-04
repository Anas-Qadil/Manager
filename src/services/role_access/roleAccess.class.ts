import prisma from "../../prisma/connection";

export default class RoleAccessService {
	public async getAllRoleAccess() {
    try {
      return await prisma.roles.findMany({
        where: {
          archive: false,
        },
      });
    } catch (e) {
      return null;
    }
  }

  public async getRoleAccessByID(id: string) {
    try {
      return await prisma.roles.findUnique({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return null;
    }
  }

  public async createRoleAccess(data: any) {
    try {
      return await prisma.roles.create({
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  public async updateRoleAccess(id: string, data: any) {
    try {
      const archivedRole = await prisma.roles.update({
        where: {
          id: id,
        },
        data: {
          archive: true,
        },
      });
      if (archivedRole) {
        return await prisma.roles.create({
          data: data,
        });
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  public async deleteRoleAccess(id: string) {
    try {
      return await prisma.roles.update({
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