
export interface IPermission {
	id: string;
  name: string;
  description: string;
  archive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id: string;
  username: string;
  matricule: string;
  password?: string;
}