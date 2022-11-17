import prisma from "../../../prisma/connection";

export default class UserService {
	async getUsers(page: number, limit: number) {
		try {
			const users = await prisma.user.findMany({
				where: {
					archive: false
				},
				skip: (page - 1) * limit,
				take: limit,
			});

			return (users);
		} catch (error) {
			return (null);
		}
	}

	async getUserByID(id: string) {
		try {
			return await prisma.user.findUnique({
				where: {
					id,
				},
			});
		} catch (e) {
			return (null);
		}
	}

	async createUser(data: any) {
		try {
			return await prisma.user.create({
				data,
			});
		} catch (e) {
			return (null);
		}
	}

	async updateUser(id: string, data: any) {
		try {
			return await prisma.user.update({
				where: {
					id,
				},
				data,
			});
		} catch (e) {
			return (null);
		}
	}

	async deleteUser(id: string) {
		try {
			return await prisma.user.delete({
				where: {
					id,
				},
			});
		} catch (e) {
			return (null);
		}
	}
}