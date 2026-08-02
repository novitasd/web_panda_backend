        import prisma from "../../config/prisma.js";

        export const findAll = async (filters = {}) => {

            const {
                search,
                brand,
                category,
                featured,
                active,
                minPrice,
                maxPrice,
                page = 1,
                limit = 12,
                sort = "newest"
            } = filters;

            const where = {};
            if (search) {

        const searchText = search.trim();

        where.OR = [

            // Buscar por nombre del producto
            {
                name: {
                    contains: searchText,
                    mode: "insensitive"
                }
            },

            // Buscar por SKU
            {
                sku: {
                    contains: searchText,
                    mode: "insensitive"
                }
            },

            // Buscar por marca
            {
                brand: {
                    name: {
                        contains: searchText,
                        mode: "insensitive"
                    }
                }
            },

            // Buscar por categoría
            {
                category: {
                    name: {
                        contains: searchText,
                        mode: "insensitive"
                    }
                }
            }

        ];
    }

            if (brand) {
                where.brand = {
                    slug: brand
                };
            }

            if (category) {
                where.category = {
                    slug: category
                };
            }

            if (featured !== undefined) {
                where.featured = featured === "true";
            }

            if (active !== undefined) {
                where.active = active === "true";
            }

            if (minPrice || maxPrice) {

                where.price = {};

                if (minPrice) {
                    where.price.gte = Number(minPrice);
                }

                if (maxPrice) {
                    where.price.lte = Number(maxPrice);
                }

            }

            let orderBy = {
                createdAt: "desc"
            };

            switch (sort) {

                case "price-asc":
                    orderBy = {
                        price: "asc"
                    };
                    break;

                case "price-desc":
                    orderBy = {
                        price: "desc"
                    };
                    break;

                case "name":
                    orderBy = {
                        name: "asc"
                    };
                    break;

            }

const [products, total] = await Promise.all([

    prisma.product.findMany({

        where,

        include: {
            brand: true,
            category: true,

            images: {
                where: {
                    isPrimary: true
                },
                take: 1,
                select: {
                    id: true,
                    url: true,
                    isPrimary: true
                }
            },

        },

        orderBy

    }),

    prisma.product.count({
        where
    })

]);

return {
    data: products,
    pagination: {
        page: 1,
        limit: products.length,
        total,
        totalPages: 1
    }
};
        };
        function generateSlug(name) {
            return name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");
        }
        export const create = async (data) => {

            // ==============================
            // SLUG AUTOMÁTICO
            // ==============================

            const baseSlug = generateSlug(data.name);

            let slug = baseSlug;
            let counter = 1;

            while (
                await prisma.product.findUnique({
                    where: { slug },
                })
            ) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }

            // ==============================
            // SKU AUTOMÁTICO
            // ==============================

            const sku = await generateSku();

            // Evitamos que un SKU enviado por el frontend
            // pueda sobrescribir el generado.
            const {
                sku: ignoredSku,
                ...productData
            } = data;

            // ==============================
            // CREAR PRODUCTO
            // ==============================

            return await prisma.product.create({
                data: {
                    ...productData,

                    sku,
                    slug,

                    price: Number(productData.price),

                    offerPrice: productData.offerPrice
                        ? Number(productData.offerPrice)
                        : null,
                },

                include: {
                    brand: true,
                    category: true,
                    images: true,
                },
            });
        };
        /**
         * Obtener un producto por slug.
         */
    /**
     * Obtener un producto ACTIVO por slug.
     * Esta función es utilizada por la tienda pública.
     */
    export const findBySlug = async (slug) => {

        return await prisma.product.findFirst({

            where: {
                slug,
                active: true,
            },

            include: {

                brand: true,

                category: true,

                images: {
                    orderBy: {
                        isPrimary: "desc",
                    },
                    select: {
                        id: true,
                        url: true,
                        isPrimary: true,
                    },
                },

                productSizes: {
                    include: {
                        size: true,
                    },
                    orderBy: {
                        size: {
                            name: "asc",
                        },
                    },
                },

            },

        });

    };

        /**
         * Obtener productos relacionados.
         */
        export const findRelated = async (product) => {

            return await prisma.product.findMany({

                where: {

                    id: {
                        not: product.id
                    },

                    active: true,

                    OR: [
                        {
                            brandId: product.brandId
                        },
                        {
                            categoryId: product.categoryId
                        }
                    ]

                },

                include: {

                    brand: true,
                    category: true,

        images: {
            where: {
                isPrimary: true
            },
            take: 1,
            select: {
                id: true,
                url: true,
                isPrimary: true
            }
        },

                },

                take: 4

            });

        };
        /**
         * Buscar producto por ID.
        /**
         * Buscar producto por ID.
         */
        export const findById = async (id) => {
            return await prisma.product.findUnique({
                where: {
                    id,
                },

                include: {
                    brand: true,
                    category: true,

                    images: {
                        orderBy: {
                            isPrimary: "desc",
                        },
                    },

                    // TALLAS + STOCK
                    productSizes: {
                        include: {
                            size: true,
                        },
                        orderBy: {
                            size: {
                                name: "asc",
                            },
                        },
                    },
                },
            });
        };
        /**
         * Actualizar producto.
         */
        export const update = async (id, data) => {

            const currentProduct = await findById(id);

            if (!currentProduct) {
                throw new Error("Producto no encontrado.");
            }

            let slug = currentProduct.slug;

            // Solo generar un nuevo slug si cambió el nombre
            if (currentProduct.name !== data.name) {

                const baseSlug = generateSlug(data.name);

                slug = baseSlug;
                let counter = 1;

                while (true) {

                    const existingProduct = await prisma.product.findUnique({
                        where: { slug },
                    });

                    // El slug no existe
                    if (!existingProduct) break;

                    // El slug pertenece al mismo producto
                    if (existingProduct.id === id) break;

                    slug = `${baseSlug}-${counter}`;
                    counter++;
                }
            }
            

            return await prisma.product.update({
                where: { id },

                data: {
                    ...data,
                    slug,
                    price: Number(data.price),
                    offerPrice: data.offerPrice
                        ? Number(data.offerPrice)
                        : null,
                },

            include: {
            brand: true,
            category: true,

            images: {
                orderBy: {
                    isPrimary: "desc",
                },
            },
        },
            });
            
        };


        async function generateSku() {
            const lastProduct = await prisma.product.findFirst({
                where: {
                    sku: {
                        startsWith: "TNIS-",
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    sku: true,
                },
            });

            let nextNumber = 1;

            if (lastProduct?.sku) {
                const currentNumber = Number(
                    lastProduct.sku.replace("TNIS-", "")
                );

                if (Number.isInteger(currentNumber)) {
                    nextNumber = currentNumber + 1;
                }
            }

            let sku;

            // Comprobación adicional por seguridad
            while (true) {
                sku = `TNIS-${String(nextNumber).padStart(6, "0")}`;

                const exists = await prisma.product.findUnique({
                    where: {
                        sku,
                    },
                });

                if (!exists) {
                    break;
                }

                nextNumber++;
            }

            return sku;
        }
        /**
         * Eliminar producto.
         */
        export const remove = async (id) => {

            const product = await prisma.product.findUnique({
                where: { id },
            });

            if (!product) {
                throw new Error("Producto no encontrado.");
            }

            return await prisma.product.delete({
                where: { id },
            });

        };

