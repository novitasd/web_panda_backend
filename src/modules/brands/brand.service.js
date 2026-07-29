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
 * Obtener marcas
 */
export async function getAllBrands() {
    return await prisma.brand.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

/**
 * Crear marca
 */
export async function createBrand({ name }) {
    const cleanName = name.trim();

    const existingBrand = await prisma.brand.findFirst({
        where: {
            name: {
                equals: cleanName,
                mode: "insensitive",
            },
        },
    });

    if (existingBrand) {
        throw new Error("Esta marca ya existe.");
    }

    let slug = generateSlug(cleanName);
    const baseSlug = slug;
    let counter = 1;

    while (
        await prisma.brand.findUnique({
            where: { slug },
        })
    ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return await prisma.brand.create({
        data: {
            name: cleanName,
            slug,
        },
    });
}

/**
 * Actualizar marca
 */
export async function updateBrand(id, { name }) {
    const brand = await prisma.brand.findUnique({
        where: { id },
    });

    if (!brand) {
        throw new Error("Marca no encontrada.");
    }

    const cleanName = name.trim();

    const duplicate = await prisma.brand.findFirst({
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
        throw new Error("Esta marca ya existe.");
    }

    let slug = generateSlug(cleanName);
    const baseSlug = slug;
    let counter = 1;

    while (true) {
        const existing = await prisma.brand.findUnique({
            where: { slug },
        });

        if (!existing || existing.id === id) {
            break;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return await prisma.brand.update({
        where: { id },

        data: {
            name: cleanName,
            slug,
        },
    });
}

/**
 * Eliminar marca
 */
export async function deleteBrand(id) {
    const brand = await prisma.brand.findUnique({
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

    if (!brand) {
        throw new Error("Marca no encontrada.");
    }

    if (brand.products.length > 0) {
        throw new Error(
            "No puedes eliminar una marca que tiene productos."
        );
    }

    return await prisma.brand.delete({
        where: { id },
    });
}