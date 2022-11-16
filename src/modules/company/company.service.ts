import prisma from "../../../prisma/connection";

export default class CompanyService {
	public async getCompanies(page: number, limit: number) {
		try {
			const companies = await prisma.company.findMany({
				where: {
					archive: false,
				},
				skip: (page - 1) * limit,
				take: limit,
			});
			return (companies);
		} catch (e) { 
			return (null) 
		}
	}

	public async getCompanyByID(id: string) {
		try {
			const company = await prisma.company.findUnique({
				where: {
					id: id,
				},
			});
			return (company);
		} catch (e) {
			return (null);
		}
	}

	public async createCompany(data: any) {
		try {
			const company = await prisma.company.create({
				data: data,
			});
			return (company);
		} catch (e) {
			return (null);
		}
	}

	public async updateCompany(id: string, data: any) {
		try {
			const company = await prisma.company.update({
				where: {
					id: id,
				},
				data: data,
			});
			return (company);
		} catch (e) {
			return (null);
		}
	}

	public async deleteCompany(id: string) {
		try {
			const company = await prisma.company.update({
				where: {
					id: id,
				},
				data: {
					archive: true,
				},
			});
			return (company);
		} catch (e) {
			return (null);
		}
	}

	public async getCompaniesCount() {
		try {
			const count = await prisma.company.count({
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