import {
    getAllBrands,
    createBrand,
    updateBrand,
    deleteBrand,
} from "./brand.service.js";


export async function getBrands(req, res) {
    try {
        const brands = await getAllBrands();

        res.status(200).json(brands);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error obteniendo las marcas",
        });
    }
}


export async function storeBrand(req, res) {
    try {
        const { name } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({
                success: false,
                message: "El nombre de la marca es obligatorio.",
            });
        }

        const brand = await createBrand({
            name,
        });

        res.status(201).json(brand);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message:
                error.message ||
                "Error creando la marca",
        });
    }
}


export async function updateBrandController(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({
                success: false,
                message: "El nombre de la marca es obligatorio.",
            });
        }

        const brand = await updateBrand(
            id,
            { name }
        );

        res.status(200).json(brand);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message:
                error.message ||
                "Error actualizando la marca",
        });
    }
}


export async function deleteBrandController(req, res) {
    try {
        const { id } = req.params;

        await deleteBrand(id);

        res.status(200).json({
            success: true,
            message: "Marca eliminada correctamente.",
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message:
                error.message ||
                "Error eliminando la marca",
        });
    }
}