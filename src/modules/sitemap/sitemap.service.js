import prisma from "../../config/prisma.js";

export async function generateSitemap() {
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

  return products;
}