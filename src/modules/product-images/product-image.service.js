import streamifier from "streamifier";
import cloudinary from "../../config/cloudinary.js";
import productImageRepository from "./product-image.repository.js";

class ProductImageService {
    async upload(productId, file, isPrimary = false) {
        if (!file) {
            throw new Error("Debe enviar una imagen.");
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "tnis/products"
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            streamifier.createReadStream(file.buffer).pipe(stream);
        });

        if (isPrimary) {
            await productImageRepository.clearPrimary(productId);
        }

        return productImageRepository.create({
            productId,
            url: result.secure_url,
            publicId: result.public_id,
            isPrimary
        });
    }

    async getByProduct(productId) {
        return productImageRepository.findByProduct(productId);
    }

    async setPrimary(id) {
        const image = await productImageRepository.findById(id);

        if (!image) {
            throw new Error("Imagen no encontrada.");
        }

        await productImageRepository.clearPrimary(image.productId);

        return productImageRepository.setPrimary(id);
    }

    async delete(id) {
        const image = await productImageRepository.findById(id);

        if (!image) {
            throw new Error("Imagen no encontrada.");
        }

        await cloudinary.uploader.destroy(image.publicId);

        return productImageRepository.delete(id);
    }
}

export default new ProductImageService();