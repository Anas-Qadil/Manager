import prisma from "../../../prisma/connection";

export default class AccountService {
	public async getAccounts(page: number, limit: number) {
		try {
			return await prisma.account.findMany({
				where: {
					archive: false,
				},
				skip: (page - 1) * limit,
				take: limit,
			});
		} catch (e) {
			return (null);
		}
	}

	public async getAccountByID(id: string) {
		try {
			return await prisma.account.findUnique({
				where: {
					id,
				},
			});
		} catch (e) {
			return (null);
		}
	}

	public async createAccount(data: any) {
		try {
			return await prisma.account.create({
				data,
			});
		} catch (e) {
			return (null);
		}
	}

	public async updateAccount(id: string, data: any) {
		try {
			return await prisma.account.update({
				where: {
					id,
				},
				data,
			});
		} catch (e) {
			return (null);
		}
	}

	public async deleteAccount(id: string) {
		try {
			return await prisma.account.delete({
				where: {
					id,
				},
			});
		} catch (e) {
			return (null);
		}
	}
}