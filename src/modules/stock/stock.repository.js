import prisma from "../../config/prisma.js";

/**
 * Obtiene todo el inventario.
 */
export const findAll = () => {
    return prisma.productSize.findMany({
        include: {
            product: {
                select: {
                    id: true,
                    sku: true,
                    name: true,
                    slug: true
                }
            },
            size: true
        },
        orderBy: [
            {
                product: {
                    name: "asc"
                }
            },
            {
                size: {
                    name: "asc"
                }
            }
        ]
    });
};

/**
 * Obtiene el inventario de un producto.
 */
export const findByProduct = (productId) => {
    return prisma.productSize.findMany({
        where: {
            productId
        },
        include: {
            size: true
        },
        orderBy: {
            size: {
                name: "asc"
            }
        }
    });
};

/**
 * Busca un registro por ID.
 */
export const findById = (id) => {
    return prisma.productSize.findUnique({
        where: {
            id
        },
        include: {
            product: true,
            size: true
        }
    });
};

/**
 * Verifica si un producto tiene una talla registrada.
 */
export const findByProductAndSize = (productId, sizeId) => {
    return prisma.productSize.findUnique({
        where: {
            productId_sizeId: {
                productId,
                sizeId
            }
        }
    });
};
export const updateStock = (tx, id, stock) => {
    return tx.productSize.update({
        where: { id },
        data: {
            stock
        }
    });
};