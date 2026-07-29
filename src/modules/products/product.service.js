import * as productRepository from "./product.repository.js";

/**
 * Obtener todos los productos.
 */
export const getAllProducts = async (filters) => {
    return await productRepository.findAll(filters);
};
/**
 * Crear producto.
 */
export const createProduct = async (data) => {
    return await productRepository.create(data);
};

/**
 * Obtener producto por slug.
 */
export const getProductBySlug = async (slug) => {

    const product = await productRepository.findBySlug(slug);

    if (!product) {
        throw new Error("Producto no encontrado.");
    }

    const relatedProducts = await productRepository.findRelated(product);

    const { productSizes, ...productData } = product;

    return {

        product: {
            ...productData,
            sizes: productSizes.map(item => ({
                id: item.id,
                sizeId: item.size.id,
                size: item.size.name,
                stock: item.stock
            }))
        },

        relatedProducts

    };

};
/**
 * Actualizar producto.
 */
export const updateProduct = async (id, data) => {
    return await productRepository.update(id, data);
};

export const deleteProduct = async (id) => {
    return await productRepository.remove(id);
};

/**
 * Obtener producto por ID.
 */
export const getProductById = async (id) => {
    const product = await productRepository.findById(id);

    if (!product) {
        throw new Error("Producto no encontrado.");
    }

    return product;
};