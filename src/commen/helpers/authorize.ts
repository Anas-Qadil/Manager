import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IUser } from '../interfaces';
import { PermissionsService } from '../../modules/authorization/permissions/permission.service';
import asyncHandler from 'express-async-handler';
import { ForbiddenError } from '../exceptions/exceptions.class';

const check_access = (permission: string) : RequestHandler => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    req.log = { ...req.log, event: permission, error: false, message: "success" }
    const user = req.user as IUser;
    const data = await (new PermissionsService()).hasPermission(user.id, permission);
    if (!data) throw new ForbiddenError('access denied');
    else next();
  });
}

export default check_access;