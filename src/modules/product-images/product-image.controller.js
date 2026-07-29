import productImageService from "./product-image.service.js";

class ProductImageController {
    async upload(req, res, next) {
        try {
            const { productId, isPrimary } = req.body;

            const image = await productImageService.upload(
                productId,
                req.file,
                isPrimary === "true"
            );

            res.status(201).json({
                message: "Imagen subida correctamente.",
                data: image
            });
        } catch (error) {
            next(error);
        }
    }

    async getByProduct(req, res, next) {
        try {
            const { productId } = req.params;

            const images = await productImageService.getByProduct(productId);

            res.json({
                data: images
            });
        } catch (error) {
            next(error);
        }
    }

    async setPrimary(req, res, next) {
        try {
            const { id } = req.params;

            const image = await productImageService.setPrimary(id);

            res.json({
                message: "Imagen principal actualizada.",
                data: image
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await productImageService.delete(id);

            res.json({
                message: "Imagen eliminada correctamente."
            });
        } catch (error) {
            next(error);
        }
    }
    
}

export default new ProductImageController();