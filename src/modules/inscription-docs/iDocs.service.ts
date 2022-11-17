import prisma from "../../../prisma/connection";

export default class iDocsService {
	public async getInscriptionDocs(page: number, limit: number) {
		try {
			return await prisma.inscriptionDocs.findMany({
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

	public async getInscriptionDocByID(id: string) {
		try {
			return await prisma.inscriptionDocs.findUnique({
				where: {
					id: id,
				},
			});
		} catch (e) {
			return (null);
		}
	}

	public async createInscriptionDoc(data: any) {
		try {
			return await prisma.inscriptionDocs.create({
				data: data,
			});
		} catch (e) {
			return (null);
		}
	}

	public async updateInscriptionDoc(id: string, data: any) {
		try {
			return await prisma.inscriptionDocs.update({
				where: {
					id: id,
				},
				data: data,
			});
		} catch (e) {
			return (null);
		}
	}

	public async deleteInscriptionDoc(id: string) {
		try {
			return await prisma.inscriptionDocs.delete({
				where: {
					id: id,
				},
			});
		} catch (e) {
			return (null);
		}
	}
}