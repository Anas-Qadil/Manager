import prisma from "../../../prisma/connection";

export default class UserProfileService {
	async getUserProfile(id: string) {
		try {
			const userProfile = await prisma.profile.findUnique({
				where: {
					id,
				},
			});
			return (userProfile);
		} catch (e) {
			return (null);
		}
	}

	async createUserProfile(data: any) {
		try {
			const userProfile = await prisma.profile.create({
				data: data
			});
			return (userProfile);
		} catch (e) {
			console.log(e);
			return (null);
		}
	}

	async updateUserProfile(id: string, data: any) {
		try {
			const userProfile = await prisma.profile.update({
				where: {
					id,
				},
				data,
			});
			return (userProfile);
		} catch (e) {
			return (null);
		}
	}

	async deleteUserProfile(id: string) {
		try {
			const userProfile = await prisma.profile.update({
				where: {
					id,
				},
				data: {
					archive: true,
				},
			});
			return (userProfile);
		} catch (e) {
			return (null);
		}
	}
}