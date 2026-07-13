# Changelog

All notable changes to the LuxeGems Store project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
