import prisma from "../../../../prisma/connection";

export default class BankDocService {
	constructor() {}
	public async getBankDocByID(id: string) {
		try {
			const bankDoc = await prisma.bankDoc.findUnique({
				where: {
					id,
				},
			});
			return (bankDoc);
		} catch (e) {
			return (null);
		}
	}

	public async updateBankDoc(id: string, data: any) {
		try {
			const updateBankDoc = await prisma.bankDoc.update({
				where: {
					id,
				},
				data,
			});
			return (updateBankDoc);
		} catch (e) {
			return (null);
		}
	}

	public async getBankDocs(page: number, limit: number) {
		try {
			const bankDocs = await prisma.bankDoc.findMany({
				where: {
					archive: false,
				},
				skip: (page - 1) * limit,
				take: limit,
			});
			return (bankDocs);
		} catch (e) {
			return (null);
		}
	}

	public async deleteBankDoc(id: string) {
		try {
			const deleteBankDoc = await prisma.bankDoc.update({
				where: {
					id,
				},
				data: {
					archive: true,
				},
			});
			return (deleteBankDoc);
		} catch (e) {
			return (null);
		}
	}

	public async getBankDocsCount() {
		try {
			const count = await prisma.bankDoc.count({
				where: {
					archive: false,
				},
			});
			return (count);
		} catch (e) {
			return (null);
		}
	}
}