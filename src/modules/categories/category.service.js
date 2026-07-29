import prisma from "../../config/prisma.js";

function generateSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
}

/**
 * Obtener todas las categorías
 */
export async function getAllCategories() {
    return await prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

/**
 * Crear categoría
 */
export async function createCategory({ name }) {
    const cleanName = name.trim();

    const existingCategory =
        await prisma.category.findFirst({
            where: {
                name: {
                    equals: cleanName,
                    mode: "insensitive",
                },
            },
        });

    if (existingCategory) {
        throw new Error(
            "Esta categoría ya existe."
        );
    }

    let slug = generateSlug(cleanName);
    const baseSlug = slug;
    let counter = 1;

    while (
        await prisma.category.findUnique({
            where: { slug },
        })
    ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return await prisma.category.create({
        data: {
            name: cleanName,
            slug,
        },
    });
}

/**
 * Actualizar categoría
 */
export async function updateCategory(
    id,
    { name }
) {
    const category =
        await prisma.category.findUnique({
            where: { id },
        });

    if (!category) {
        throw new Error(
            "Categoría no encontrada."
        );
    }

    const cleanName = name.trim();

    const duplicate =
        await prisma.category.findFirst({
            where: {
                name: {
                    equals: cleanName,
                    mode: "insensitive",
                },

                NOT: {
                    id,
                },
            },
        });

    if (duplicate) {
        throw new Error(
            "Esta categoría ya existe."
        );
    }

    let slug = generateSlug(cleanName);
    const baseSlug = slug;
    let counter = 1;

    while (true) {
        const existing =
            await prisma.category.findUnique({
                where: { slug },
            });

        if (!existing || existing.id === id) {
            break;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return await prisma.category.update({
        where: { id },

        data: {
            name: cleanName,
            slug,
        },
    });
}

/**
 * Eliminar categoría
 */
export async function deleteCategory(id) {
    const category =
        await prisma.category.findUnique({
            where: { id },

            include: {
                products: {
                    select: {
                        id: true,
                    },
                    take: 1,
                },
            },
        });

    if (!category) {
        throw new Error(
            "Categoría no encontrada."
        );
    }

    if (category.products.length > 0) {
        throw new Error(
            "No puedes eliminar una categoría que tiene productos."
        );
    }

    return await prisma.category.delete({
        where: { id },
    });
}