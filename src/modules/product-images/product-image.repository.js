import prisma from "../../config/prisma.js";

class ProductImageRepository {
    async create(data) {
        return prisma.productImage.create({
            data
        });
    }

    async findByProduct(productId) {
        return prisma.productImage.findMany({
            where: {
                productId
            },
            orderBy: [
                {
                    isPrimary: "desc"
                },
                {
                    createdAt: "asc"
                }
            ]
        });
    }

    async findById(id) {
        return prisma.productImage.findUnique({
            where: {
                id
            }
        });
    }

    async delete(id) {
        return prisma.productImage.delete({
            where: {
                id
            }
        });
    }

    async clearPrimary(productId) {
        return prisma.productImage.updateMany({
            where: {
                productId
            },
            data: {
                isPrimary: false
            }
        });
    }

    async setPrimary(id) {
        return prisma.productImage.update({
            where: {
                id
            },
            data: {
                isPrimary: true
            }
        });
    }
}

export default new ProductImageRepository();