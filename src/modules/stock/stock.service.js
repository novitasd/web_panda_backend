import * as stockRepository from "./stock.repository.js";

import prisma from "../../config/prisma.js";

/**
 * Obtiene todo el inventario.
 */
export const findAll = async () => {
    return await stockRepository.findAll();
};

/**
 * Obtiene el inventario de un producto.
 */
export const findByProduct = async (productId) => {
    return await stockRepository.findByProduct(productId);
};


