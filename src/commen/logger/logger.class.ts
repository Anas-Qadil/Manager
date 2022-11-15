import prisma from "../../../prisma/connection";

export default class LogService {
	public async createLog(data: any) {
    try {
      return await prisma.syslog.create({
        data: data,
      });
    } catch (e: any) {
      return null;
    }
  }

  public async getLogs() {
    try {
      return await prisma.syslog.findMany();
    } catch (e) {
      return null;
    }
  }
}