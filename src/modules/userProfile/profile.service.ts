import prisma from "../../../prisma/connection";

export default class UserProfileService {
	async getUserProfile(id: string) {
		const userProfile = await prisma.profile.findUnique({
			where: {
				id,
			},
		});
		return (userProfile);
	}

	async createUserProfile(data: any) {
		const userProfile = await prisma.profile.create({
			data: data
		});
		return (userProfile);
	}

	async updateUserProfile(id: string, data: any) {
		const userProfile = await prisma.profile.update({
			where: {
				id,
			},
			data,
		});
		return (userProfile);
	}

	async deleteUserProfile(id: string) {
		const userProfile = await prisma.profile.update({
			where: {
				id,
			},
			data: {
				archive: true,
			},
		});
		return (userProfile);
	}
}