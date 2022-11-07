import prisma from "../../prisma/connection";

export default class RoleService {
	public async getAllRole() {
    try {
      return await prisma.roles.findMany({
        where: {
          archive: false,
        },
        include: {
          permissions: true,
          creator: {
            select: {
              id: true,
              username: true,
              active: true,
              matricule: true,
              createdAt: true,
            },
          }
        },
      });
    } catch (e) {
      return null;
    }
  }

  public async getRoleByID(id: string) {
    try {
      return await prisma.roles.findUnique({
        where: {
          id: id,
        },
        include: {
          permissions: true,
          creator: {
            select: {
              id: true,
              username: true,
              active: true,
              matricule: true,
              createdAt: true,
            },
          }
        },
      });
    } catch (e) {
      return null;
    }
  }

  public async createRole(data: any) {
    try {
      return await prisma.roles.create({
        data: data,
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async updateRole(id: string, data: any) {
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

  public async deleteRole(id: string) {
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