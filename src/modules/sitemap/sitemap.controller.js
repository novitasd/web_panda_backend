import { generateSitemap } from "./sitemap.service.js";

export async function sitemap(req, res, next) {
  try {
    const products = await generateSitemap();

    const baseUrl = "https://www.tnisperu.com";

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
  <loc>${baseUrl}</loc>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>

<url>
  <loc>${baseUrl}/catalogo</loc>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>

${products
  .map(
    (product) => `
<url>
  <loc>${baseUrl}/producto/${product.slug}</loc>
  <lastmod>${product.updatedAt.toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`
  )
  .join("")}

</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    next(error);
  }
}