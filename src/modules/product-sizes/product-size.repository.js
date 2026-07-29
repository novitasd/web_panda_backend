import prisma from "../../config/prisma.js";

/**
 * Crear relación producto-talla.
 */
export const create = (data) => {

    return prisma.productSize.create({

        data: {
            ...data,
            stock: 0
        },

        include: {
            product: true,
            size: true
        }

    });

};

/**
 * Buscar relación existente.
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