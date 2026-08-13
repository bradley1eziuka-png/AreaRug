# Area Rug Co. — Website Prototype

A static, responsive prototype for **Area Rug Co.**, a designer-guided rug retailer with two Michigan showrooms (Birmingham and Rochester Hills). Built as the design prototype for a custom Shopify theme rebuild.

## Pages

| File | Page |
|------|------|
| `index.html` | Homepage |
| `product.html` | Product page (Adoni Charcoal) |
| `about.html` | Our Story |
| `showrooms.html` | Showrooms (Birmingham & Rochester Hills) |
| — | Cart drawer (shared component, opens from the cart icon on any page) |

## Run locally

Serve the project root with any static file server, for example:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Structure

- `assets/site.css` — shared stylesheet for all pages
- `assets/img/` — images
- `assets/video/` — videos (muted autoplay with an unmute control)
- `screenshot.mjs` — Playwright screenshot helper (dev only; requires `playwright`)

Type: Newsreader (serif) + Instrument Sans, via Google Fonts. Accent: pine green.

## Notes

- Product-card and product-page photography use clearly labeled placeholders pending final product images.
- Customer reviews are marked pending a review audit rather than fabricated.
- Content (addresses, hours, press, certifications, product names and prices) reflects real Area Rug Co. information.
