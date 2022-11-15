import prisma from "../../../../prisma/connection";

export default class RoleService {

  public async getRoles(userID: string) {
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
  }

	public async getAllRole() {
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
  }

  public async getRoleByID(id: string) {
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
  }

  public async createRole(data: any) {
    return await prisma.agentRoles.create({
      data: data,
    });
  }

  public async updateRole(id: string, data: any) {
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
  }

  public async deleteRole(id: string) {
    return await prisma.agentRoles.update({
      where: {
        id: id,
      },
      data: {
        archive: true,
      },
    });
  }
}