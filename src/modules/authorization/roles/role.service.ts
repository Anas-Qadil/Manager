import prisma from "../../../../prisma/connection";

export default class RoleService {

  public async getRoles(userID: string) {
    try {
      const data: any = await prisma.backOfficeRoles.findMany({
        where: {
          guestID: userID,
        },
        select: {
          role: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      const roles: any = [];
      data.map((doc: any) => {
        doc.role.map((role: any) => {
          roles.push(role);
        });
      });
      return roles;
    } catch (e) {
      return null;
    }
  }

	public async getAllRole() {
    try {
      return await prisma.agentRoles.findMany({
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
      return await prisma.agentRoles.findUnique({
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
      return await prisma.agentRoles.create({
        data: data,
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async updateRole(id: string, data: any) {
    try {
      const archivedRole = await prisma.agentRoles.update({
        where: {
          id: id,
        },
        data: {
          archive: true,
        },
      });
      if (archivedRole) {
        return await prisma.agentRoles.create({
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
      return await prisma.agentRoles.update({
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