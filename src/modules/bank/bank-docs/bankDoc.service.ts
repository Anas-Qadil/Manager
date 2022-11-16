import prisma from "../../../../prisma/connection";

export default class BankDocService {
	constructor() {}
	public async getBankDocByID(id: string) {
		const bankDoc = await prisma.bankDoc.findUnique({
			where: {
				id,
			},
		});
		return (bankDoc);

	}

	public async updateBankDoc(id: string, data: any) {
		const updateBankDoc = await prisma.bankDoc.update({
			where: {
				id,
			},
			data,
		});
		return (updateBankDoc);
	}

	public async getBankDocs(page: number, limit: number) {
		const bankDocs = await prisma.bankDoc.findMany({
			where: {
				archive: false,
			},
			skip: (page - 1) * limit,
			take: limit,
		});
		return (bankDocs);
	}

	public async deleteBankDoc(id: string) {
		const deleteBankDoc = await prisma.bankDoc.update({
			where: {
				id,
			},
			data: {
				archive: true,
			},
		});
		return (deleteBankDoc);
	}

	public async getBankDocsCount() {
		const count = await prisma.bankDoc.count({
			where: {
				archive: false,
			},
		});
		return (count);
	}
}