import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "./category.service.js";


export async function getCategories(req, res) {
    try {
        const categories =
            await getAllCategories();

        res.status(200).json(categories);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Error obteniendo categorías",
        });
    }
}


export async function storeCategory(req, res) {
    try {
        const { name } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    "El nombre de la categoría es obligatorio.",
            });
        }

        const category =
            await createCategory({
                name,
            });

        res.status(201).json(category);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message:
                error.message ||
                "Error creando categoría",
        });
    }
}


export async function updateCategoryController(
    req,
    res
) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    "El nombre de la categoría es obligatorio.",
            });
        }

        const category =
            await updateCategory(
                id,
                { name }
            );

        res.status(200).json(category);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message:
                error.message ||
                "Error actualizando categoría",
        });
    }
}


export async function deleteCategoryController(
    req,
    res
) {
    try {
        const { id } = req.params;

        await deleteCategory(id);

        res.status(200).json({
            success: true,
            message:
                "Categoría eliminada correctamente.",
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message:
                error.message ||
                "Error eliminando categoría",
        });
    }
}