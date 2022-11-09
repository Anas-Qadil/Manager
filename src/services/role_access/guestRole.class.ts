import prisma from "../../prisma/connection";

export default class GuestRoleService {

  public async getGuestRole(guestID: string) {
    try {
      return await prisma.user_role.findFirst({
        where: {
          guestID: guestID,
        },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
      });
    } catch (e) {
      return null;
    }
  }

  public async getAllGuestRoles() {
    try {
      return await prisma.user_role.findMany({
        where: {
          archive: false,
        },
        include: {
          guest: {
            select: {
              id: true,
              username: true,
              active: true,
              matricule: true,
              createdAt: true,
            },
          },
          assignedBy_: {
            select: {
              id: true,
              username: true,
              active: true,
              matricule: true,
              createdAt: true,
            },
          },
          role: true,
        },
      });
    } catch (e) {
      return (null);
    }
  }

  public async getGuestRoleByID(id: string) {
    try {
      return await prisma.user_role.findUnique({
        where: {
          id: id,
        },
        include: {
          guest: {
            select: {
              id: true,
              username: true,
              active: true,
              matricule: true,
              createdAt: true,
            },
          },
          assignedBy_: {
            select: {
              id: true,
              username: true,
              active: true,
              matricule: true,
              createdAt: true,
            },
          },
          role: true,
        },
      });
    } catch (e) {
      return (null);
    }
  }

  public async createGuestRole(data: any) {
    try {
      return await prisma.user_role.create({
        data: data,
      });
    } catch (e) {
      return (null);
    }
  }

  public async updateGuestRole(id: string, data: any) {
    try {
      const archived = await prisma.user_role.update({
        where: {
          id: id,
        },
        data: {
          archive: true,
        },
      });
      if (archived) {
        return await prisma.user_role.update({
          where: {
            id: id,
          },
          data: data
        });
      }
    } catch (e) {
      return (null);
    }
  }

  public async deleteGuestRole(id: string) {
    try {
      return await prisma.user_role.update({
        where: {
          id: id,
        },
        data: {
          archive: true,
        },
      });
    } catch (e) {
      return (null);
    }
  }
}