# Changelog

All notable changes to the LuxeGems Store project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
