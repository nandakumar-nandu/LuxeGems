# Changelog

All notable changes to the LuxeGems Store project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.8.0] - 2026-07-16 16:18

### Added
- **🎨 Brand About View**: Created `/app/about/page.tsx` describing brand history timelines, artisan sourcing convictions, and creative designer summaries.
- **🎨 Contact Messaging Portal**: Developed `/app/contact/page.tsx` integrating React Hook Form + Zod validations and EmailJS templates (with automatic simulation mock overrides if credentials are omitted).
- **🎨 Reusable Toast System**: Created toast messaging layout `/components/ui/Toast.tsx` presenting Emerald-Green success alerts and Crimson-Red error notices.
- **🎨 Framer Motion Micro-Animations**:
  - Hero load fading and sliding configurations.
  - Card hover scale adjustments and shadow lifts in `ProductCard`.
  - Right-aligned slide timelines in `CartDrawer` using `AnimatePresence`.
  - Dynamic page route fade transitions using Next.js `template.tsx` structure.

## [0.7.0] - 2026-07-16 15:52

### Added
- **📁 Order Retrieval Route**: Created GET API endpoint `/app/api/orders/[trackingId]/route.ts` retrieving customer orders dynamically from MongoDB (or local file fallback storage) using dynamic parameter routes.
- **🎨 Order Tracking Dashboard**: Designed `/app/track-order/page.tsx` client search workspace implementing a visual status stepper (Pending → Processing → Shipped → Delivered), itemized line tables, and recipient descriptions.
- **🎨 Product Detail View**: Built dynamic page `/app/products/[id]/page.tsx` rendering large item images, categorization tags, localized pricing, stock counts, and cart dispatch bindings.
- **🎨 Related Recommendations Section**: Integrated "You may also like" related products carousel grids querying pieces belonging to the same category.
- **🎨 Product Cards Linking**: Updated `ProductCard` component to link titles and image thumbnails directly to the dynamic product detail route.

## [0.6.0] - 2026-07-16 15:41

### Added
- **📁 Order Database Model**: Created Mongoose model definition in `/lib/models/Order.ts` to persist client orders, customer profiles, shipping locations, and Stripe session references.
- **📁 Stripe Checkout Integration**: Implemented checkout route `/app/api/checkout/route.ts` creating Stripe Sessions (or fallback simulations if credentials are absent) and saving pending orders with random `LG-XXXX-XXXX` tracking IDs.
- **📁 Secure Webhook Receiver**: Created webhook listener `/app/api/webhook/route.ts` executing signature verification security validations and updating MongoDB order states.
- **🎨 Order Success Page**: Designed presentation page `/app/order-success/page.tsx` rendering success animations and tracking code parameters wrapped in Suspense boundaries.

## [0.5.0] - 2026-07-16 15:18

### Added
- **📁 MongoDB Mongoose Adapter**: Implemented client-cached database connection pools in `/lib/db/mongoose.ts` ensuring optimized connection counts.
- **📁 Product Database Model**: Created Mongoose model definition in `/lib/models/Product.ts` mapping properties (`name`, `price`, `category`, `image`, `description`, `stock`, `isNew`, `isFeatured`).
- **📁 Products API Routes**: Established GET list endpoint `/app/api/products/route.ts` (with optional filters) and detail endpoint `/app/api/products/[id]/route.ts`.
- **📁 Catalog Seed Generator**: Created seeding script `/lib/db/seed.ts` inserting 8 fine jewelry items.
- **🎨 Dynamic Shop Fetching**: Updated `/app/shop/page.tsx` to fetch catalog items dynamically from backend API routes with Next.js revalidation.

## [0.4.0] - 2026-07-16 15:08

### Added
- **📁 Full-Page Cart Gallery**: Created `/app/cart/page.tsx` rendering a high-end tabular list layout of selected jewelry items, custom increment/decrement quantity parameters, line totals, and order summary sidebars.
- **📁 Reusable FormField**: Created `/components/ui/FormField.tsx` providing standard labeled text inputs with forwarded refs and reactive red error alerts.
- **📁 Multi-Step Checkout Flow**: Created `/app/checkout/page.tsx` featuring Contact, Shipping, and Review panels verified by React Hook Form and Zod validation schemas.

## [0.3.0] - 2026-07-16 15:00

### Added
- **📁 Cart State Context**: Created client-side `/lib/context/CartContext.tsx` with a `useReducer` state management framework handling addToCart, removeFromCart, updateQuantity, and clearCart actions.
- **📁 Cart Drawer UI Component**: Created `/components/ui/CartDrawer.tsx` rendering a premium slide-over side panel with backdrop overlays, scrollable item listings, quantity increment/decrement controls, subtotals, and checkout hooks.
- **🎨 Navbar and Card Hookups**: Wired the shop page `ProductCard` additions to context and animated the `Navbar` shopping bag icon and count badge dynamically.

## [0.2.0] - 2026-07-15 10:56

### Added
- **📁 ProductCard Component**: Created `/components/ui/ProductCard.tsx` to display jewelry items with premium styled card layouts, hover zoom transitions, category badges, and unwired Add to Cart buttons.
- **📁 Shop Page Gallery**: Created `/app/shop/page.tsx` displaying a responsive grid of 6 hardcoded mock products and an interactive filter navigation bar UI.
- **🎨 Active Navigation Highlight**: Integrated Next.js `usePathname` in the global `Navbar` component to highlight the currently active path with a premium golden bottom underline indicator.

## [0.1.0] - 2026-07-13 21:53

### Added
- **📁 Project Scaffold**: Initialized a Next.js 14 App Router project with TypeScript and Tailwind CSS.
- **📁 Core Directories**: Created folders for `/components/ui`, `/components/layout`, `/lib`, `/types`, `/hooks`, and `/public`.
- **⚙️ Environment Configuration**: Configured `.env` and `.env.example` templates for MongoDB and Stripe.
- **🎨 Base Layout Styles**: Configured Google Fonts (Playfair Display and Montserrat) and global styles.
- **🎨 Layout Components**:
  - `Navbar`: Premium sticky navigation header with dynamic SVG diamond logo and cart status count badge.
  - `Footer`: Four-column detailed structure for brand description, collections, customer care, and newsletter signups.
- **🎨 Atomic UI Components**:
  - `Button`: Features primary, secondary, outline, ghost, and premium gold styling.
  - `Card`: Features borders, headers, titles, descriptions, and dynamic hover effects.
  - `Badge`: Used for product statuses and tags (e.g. Sale, New, success, destructive, gold).
- **📦 Data Types**: Set up core domain models in `types/index.ts` for Product, Category, CartItem, User, and Order.
- **⚙️ Helpers**: Created price formatting and class name concatenation utilities in `lib/utils.ts`.
- **📁 Project Documentation**: Created README.md, CHANGELOG.md, WALKTHROUGH.md, and SCREENTOUR.md.
