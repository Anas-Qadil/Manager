import prisma from "../../../../prisma/connection";

export default class BankAccountService {
	public async getBankAccountByID(id: string) {
		const  bankAccount  = await prisma.bankAccount.findUnique({
			where: {
				id,
			},
		});
		return bankAccount;
	}	

	public async createBankAccount(data: any) {
		const bankAccount = await prisma.bankAccount.create({
			data,
		});
		return bankAccount;
	}

	public async updateBankAccount(id: string, data: any) {
		const updatedBankAccount = await prisma.bankAccount.update({
			where: {
				id,
			},
			data,
		});
		return (updatedBankAccount);
	}

	public async deleteBankAccount(id: string) {
		const deletedBankAccount = await prisma.bankAccount.update({
			where: {
				id,
			},
			data: {
				archive: true,
			}
		});
		return (deletedBankAccount);
	}

	public async getBankAccounts(page: number, limit: number) {
		const bankAccounts = await prisma.bankAccount.findMany({
			where: {
				archive: false,
			},
			skip: (page - 1) * limit,
			take: limit,
		});
		return bankAccounts;
	}
}