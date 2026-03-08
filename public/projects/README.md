# Project screenshots

Put your project screenshots here, one folder per project slug:

- `ecommerce-configurator/` — for E-Commerce + SVG Configurator
- `cocktail-app/` — for Shake It!
- `desktop-wpf/` — for Desktop App - Tablette

Example: add `ecommerce-configurator/1.jpg`, `ecommerce-configurator/2.jpg`, then in `lib/projects.ts` set:

```ts
images: ["/projects/ecommerce-configurator/1.jpg", "/projects/ecommerce-configurator/2.jpg"]
```

Paths must start with `/projects/...` (served from site root).
