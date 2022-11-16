import prisma from "../../../../prisma/connection";

export default class BankAccountService {
	public async getBankAccountByID(id: string) {
		try {
			const  bankAccount  = await prisma.bankAccount.findUnique({
				where: {
					id,
				},
			});
			return bankAccount;
		} catch (e) {
			return (null);
		}
	}	

	public async createBankAccount(data: any) {
		try {
			const bankAccount = await prisma.bankAccount.create({
				data,
			});
			return bankAccount;
		} catch (e) {
			return (null);
		}
	}

	public async updateBankAccount(id: string, data: any) {
		try {
			const updatedBankAccount = await prisma.bankAccount.update({
				where: {
					id,
				},
				data,
			});
			return (updatedBankAccount);
		} catch (e) {
			return (null);
		}
	}

	public async deleteBankAccount(id: string) {
		try {
			const deletedBankAccount = await prisma.bankAccount.update({
				where: {
					id,
				},
				data: {
					archive: true,
				}
			});
			return (deletedBankAccount);
		} catch (e) {
			return (null);
		}	
	}

	public async getBankAccounts(page: number, limit: number) {
		try {
			const bankAccounts = await prisma.bankAccount.findMany({
				where: {
					archive: false,
				},
				skip: (page - 1) * limit,
				take: limit,
			});
			return bankAccounts;
		} catch (e) {
			return (null);
		}
	}

	public async getBankAccountsCount() {
		try {
			const count = await prisma.bankAccount.count({
				where: {
					archive: false,
				},
			});
			return count;
		} catch (e) {
			return (null);
		}
	}
}