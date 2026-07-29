import prisma from "../../config/prisma.js";

export const getStats = async () => {

    const [
        products,
        brands,
        categories,
        orders,
        totalStock,
        outOfStock,
        lowStock
    ] = await Promise.all([

        prisma.product.count(),

        prisma.brand.count(),

        prisma.category.count(),

        prisma.order.count(),

        prisma.productSize.aggregate({
            _sum: {
                stock: true
            }
        }),

        prisma.productSize.count({
            where: {
                stock: 0
            }
        }),

        prisma.productSize.count({
            where: {
                stock: {
                    gt: 0,
                    lte: 5
                }
            }
        })

    ]);

    return {
        products,
        brands,
        categories,
        orders,
        totalStock: totalStock._sum.stock ?? 0,
        outOfStock,
        lowStock
    };

};