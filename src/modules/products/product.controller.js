import {
    getAllProducts,
    getProductBySlug,
    getProductById as getProductByIdService,
    createProduct,
    updateProduct,
    deleteProduct,
} from "./product.service.js";
export async function getProducts(req, res) {
    try {
        const products = await getAllProducts(req.query);

        res.status(200).json(products);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error obteniendo productos",
        });
    }
}
export async function getProductById(req, res) {
    try {
        const { id } = req.params;

        const product = await getProductByIdService(id);

        res.status(200).json(product);

    } catch (error) {
        console.error(error);

        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

export async function storeProduct(req, res) {
    try {
        const product = await createProduct(req.body);

        res.status(201).json(product);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function getProduct(req, res) {
    try {
        const { slug } = req.params;

        const product = await getProductBySlug(slug);

        res.status(200).json(product);

    } catch (error) {
        console.error(error);

        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

export async function editProduct(req, res) {
    try {
        const { id } = req.params;

        const product = await updateProduct(id, req.body);

        res.status(200).json(product);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function destroyProduct(req, res) {
    try {
        const { id } = req.params;

        await deleteProduct(id);

        res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente.",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}