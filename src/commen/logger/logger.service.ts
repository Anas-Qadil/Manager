import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces';
import LogService from './logger.class';

// log middleware
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    const description = `user ${user.matricule || ""} tried to access ${req.originalUrl || ""} at ${new Date()}`;

    const log = {
      dateTime: new Date(),
      userAgent: req.headers['user-agent'] || "",
      sourceIP: req.ip || "",
      hostName: req.hostname || "",
      hostIP: req.socket.localAddress || "",
      protocol: req.protocol || "",
      port: String(req.socket.localPort) || "",
      requestURI: req.originalUrl || "",
      requestMethod: req.method || "",
      region: req.headers['cf-ipcountry'] || "",
      geo: req.headers['cf-visitor'] || "",
      appID: process.env.APP_ID || "",
      event: req.log.event || "",
      message: req.log.message || "",
      description: description || "",
      level: req.log.error ? "ERROR" : "SUCCESS",
    }
    const createdLog = await new LogService().createLog(log);
    if (!createdLog) throw new Error(description);
  } catch (err: any) {
    await new LogService().createLog({
      dateTime: new Date(),
      userAgent: req.headers['user-agent'] || "",
      description: err.message || "",
      message: "ERROR log was not created",
      level: "ERROR",
    });
  }
}

