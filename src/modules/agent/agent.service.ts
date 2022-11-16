import prisma from "../../../prisma/connection";

interface Guest {
  errorCode: number;
  guest: any;
}

export default class GuestService {
  
 public getGuests = async (): Promise<Guest> => {
    try {
      const guest =  await prisma.agents.findMany({
        where: {
          archive: false,
        },
        include: {
          creator: true,
        },
      });
      return {
        errorCode: 0,
        guest,
      };
    } catch (e: any) {
      return ({
        errorCode: e.code,
        guest: null
      });
    }
 }

  public getGuestByID = async (id: string): Promise<Guest> => {
    try {
      const guest = await prisma.agents.findUnique({
        where: {
          id: id,
        },
        include: {
          creator: true,
          role: true,
        },
      });
      return {
        errorCode: 0,
        guest,
      };
    } catch (e: any) {
      return ({
        errorCode: e.code,
        guest: null
      });
    }
  }

  public createGuest = async (data: any): Promise<Guest> => {
    try {
      const guest =  await prisma.agents.create({
        data: data,
      });
      return {
        errorCode: 0,
        guest
      };
    } catch (e: any) {
      return ({
        errorCode: e.code,
        guest: null
      });
    }
  }

  public updateGuest = async (id: string, data: any): Promise<Guest> => {
    try {
      const guest = await prisma.agents.update({
        where: {
          id: id,
        },
        data: data
      });
      return {
        errorCode: 0,
        guest,
      };
    } catch (e: any) {
      return ({
        errorCode: e.code,
        guest: null
      });
    }
  }

  public deleteGuest = async (id: string): Promise<Guest> => {
    try {
      const guest = await prisma.agents.update({
        where: {
          id: id,
        },
        data: {
          archive: true
        }
      });
      return {
        errorCode: 0,
        guest,
      };
    } catch (e: any) {
      return ({
        errorCode: e.code,
        guest: null
      });
    }
  }
}