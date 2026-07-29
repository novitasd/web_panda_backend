import prisma from "../../config/prisma.js";

class AuthRepository {

    async findByEmail(email) {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async findById(id) {
        return prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async create(data) {
        return prisma.user.create({
            data
        });
    }

    async saveRefreshToken(userId, token, expiresAt) {

        return prisma.refreshToken.create({
            data: {
                userId,
                token,
                expiresAt
            }
        });

    }

    async findRefreshToken(token) {

        return prisma.refreshToken.findUnique({
            where: {
                token
            },
            include: {
                user: true
            }
        });

    }

    async revokeRefreshToken(id) {

        return prisma.refreshToken.update({
            where: {
                id
            },
            data: {
                revoked: true
            }
        });

    }

}

export default new AuthRepository();