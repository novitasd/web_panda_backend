import { generateSitemap } from "./sitemap.service.js";

export async function sitemap(req, res, next) {
  try {
    const {
      products,
      categories,
      brands,
    } = await generateSitemap();

    const baseUrl = "https://www.tnisperu.com";

    const urls = [];

    // ========================================
    // INICIO
    // ========================================

    urls.push(`
<url>
  <loc>${baseUrl}/</loc>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>`);


    // ========================================
    // CATÁLOGO
    // ========================================

    urls.push(`
<url>
  <loc>${baseUrl}/catalogo</loc>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>`);


    // ========================================
    // CATEGORÍAS
    // ========================================

    for (const category of categories) {
      urls.push(`
<url>
  <loc>${baseUrl}/catalogo/${category.slug}</loc>
  <lastmod>${category.updatedAt.toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`);
    }


    // ========================================
    // MARCAS
    // ========================================

    for (const brand of brands) {
      urls.push(`
<url>
  <loc>${baseUrl}/marca/${brand.slug}</loc>
  <lastmod>${brand.updatedAt.toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`);
    }


    // ========================================
    // PRODUCTOS
    // ========================================

    for (const product of products) {
      urls.push(`
<url>
  <loc>${baseUrl}/producto/${product.slug}</loc>
  <lastmod>${product.updatedAt.toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`);
    }


    // ========================================
    // XML
    // ========================================

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls.join("")}
</urlset>`;

    res.header(
      "Content-Type",
      "application/xml"
    );

    res.send(xml);

  } catch (error) {
    next(error);
  }
}