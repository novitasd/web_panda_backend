import * as productSizeRepository from "./product-size.repository.js";

/**
 * Crear una relación producto-talla.
 */
export const create = async (data) => {

    const { productId, sizeId } = data;

    const exists = await productSizeRepository.findByProductAndSize(
        productId,
        sizeId
    );

    if (exists) {
        throw new Error("Esta talla ya está asignada al producto.");
    }

    return await productSizeRepository.create(data);

};