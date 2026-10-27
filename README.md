# Clothes Closet — Next.js Fashion Storefront

A responsive fashion storefront inspired by the supplied reference: minimalist background, hanging-product carousel, blurred side products, animated transitions, product details, size selection, and a working demo cart.

## Requirements
- Node.js 18.17+ (Node.js 20 LTS recommended)
- npm

## Run locally
1. Extract this ZIP.
2. Open the `clothes-closet-nextjs` folder in VS Code.
3. In the VS Code terminal run:

   ```bash
   npm install
   npm run dev
   ```

4. Open http://localhost:3000

## Features
- Next.js App Router + React + TypeScript
- Tailwind CSS setup and custom responsive CSS
- Framer Motion carousel transitions and cart drawer
- Click side garments or use arrows to change the selected product
- Size selection and product pricing
- Add to bag, quantity controls, subtotal
- Responsive desktop/mobile layouts
- Accessibility labels and reduced-motion CSS support

## Customize products
Edit the `products` array near the top of `app/page.tsx`. Update each product's:
- `name`, `category`, `price`
- `color`, `colorName`
- `sizes`
- `image` (use your own product image URL or a local file under `public/`)

For local images, put images in `public/products/` and set e.g. `image: "/products/blue-tank.png"`.

## Important production notes
This is a frontend demo. The cart is held in React state and resets on refresh. Checkout intentionally displays a demo notice. It does **not** process payments, save orders, authenticate customers, or connect to inventory. For a real shop, add a backend/database and integrate a trusted payment provider. Use product images you own or have permission to use. The sample Unsplash images are illustrative and may not match the garment silhouette exactly.
