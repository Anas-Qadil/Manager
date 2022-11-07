import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const validString = (str: string): boolean => {
  const format = /[!#%^&*()+\=\[\]{};':"\\|,<>\/?]+/;
  if (str.match(format) || str.length <= 0) {
    return false;
  }
  return true;
}