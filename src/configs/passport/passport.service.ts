import prisma from '../../prisma/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const isUserExist = async (username: string) => {
  const user = await prisma.guests.findFirst({
    where: {
      username: username,
      archive: false,
      active: true
    },
    select: {
      id: true,
      password: true,
      matricule: true,
      username: true,
    },
  });
  return (user);
}

// old password is the password in the database :)
// new password is the password that the user entered :)
const comparePassword = async (oldPassword: string, newPassword: string) => {
  const isMatch: boolean = await bcrypt.compare(newPassword, oldPassword);
  return (isMatch);
}

interface IToken {
  error: number,
  token: string
}

const generateToken = (user: any): IToken => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) return ({ error: 1, token: "" });
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "30d" });
  return ({ error: 0, token: token });
}

export {
  isUserExist,
  comparePassword,
  generateToken
}