import prisma from "../../../prisma/connection";

export default class CompanyService {
	public async getCompanies(page: number, limit: number) {
		const companies = await prisma.company.findMany({
			where: {
				archive: false,
			},
			skip: (page - 1) * limit,
			take: limit,
		});
		return (companies);
	}

	public async getCompanyByID(id: string) {
		const company = await prisma.company.findUnique({
			where: {
				id: id,
			},
		});
		return (company);
	}

	public async createCompany(data: any) {
		const company = await prisma.company.create({
			data: data,
		});
		return (company);
	}

	public async updateCompany(id: string, data: any) {
		const company = await prisma.company.update({
			where: {
				id: id,
			},
			data: data,
		});
		return (company);
	}

	public async deleteCompany(id: string) {
		const company = await prisma.company.update({
			where: {
				id: id,
			},
			data: {
				archive: true,
			},
		});
		return (company);
	}
}