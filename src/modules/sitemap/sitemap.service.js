import prisma from "../../config/prisma.js";

export async function generateSitemap() {

  // ==========================
  // PRODUCTOS ACTIVOS
  // ==========================

  const products = await prisma.product.findMany({
    where: {
      active: true,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });


  // ==========================
  // MARCAS CON PRODUCTOS ACTIVOS
  // ==========================

  const brands = await prisma.brand.findMany({
    where: {
      products: {
        some: {
          active: true,
        },
      },
    },
    select: {
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });


  // ==========================
  // CATEGORÍAS CON PRODUCTOS ACTIVOS
  // ==========================

  const categories = await prisma.category.findMany({
    where: {
      products: {
        some: {
          active: true,
        },
      },
    },
    select: {
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });


  return {
    products,
    brands,
    categories,
  };
}