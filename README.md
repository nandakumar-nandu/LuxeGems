<!--
  📁 README.md
  📁 Main documentation for LuxeGems Store.
  ⚙️ Outlines setup steps, folder paths, routing flow, and project architecture.
-->

# LuxeGems Store

LuxeGems Store is a premium, full-stack jewelry e-commerce web application engineered with modern web standards to deliver an immersive, elegant, and secure shopping experience for high-end fine jewelry.

---

### Tech Stack Badges
![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38bdf8?style=for-the-badge&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47a248?style=for-the-badge&logo=mongodb)
![Stripe](https://img.shields.io/badge/Stripe-Integration-635bff?style=for-the-badge&logo=stripe)

---

### Current Status
**✅ Commit 1 — init: Project Scaffold, Folder Structure, Base Layout, and Documentation**
This phase establishes the structural blueprint, design styles, and global configuration of the application. No business logic or database connections are active yet.

**✅ Commit 2 — feat: add ProductCard component and static shop page**
This phase introduces the product visual catalog with a static `/shop` page grid gallery and the reusable atomic `ProductCard` component, as well as navbar active route highlights.

---

## Folder Structure Tree
```text
LuxeGems/
├── app/                  # Next.js App Router Pages and Layouts
│   ├── favicon.ico
│   ├── fonts/            # Local asset font binaries
│   ├── globals.css       # Core Tailwind CSS and base styles
│   ├── layout.tsx        # Global page wrapper with Navbar and Footer
│   ├── page.tsx          # Homepage containing the premium Hero section
│   └── shop/             # Shop Pages
│       └── page.tsx      # Static shop gallery page with mock products
├── components/           # Reusable UI component layers
│   ├── layout/           # Global structural components
│   │   ├── Footer.tsx    # Global Footer links and newsletter area
│   │   └── Navbar.tsx    # Glassmorphism sticky Navbar
│   └── ui/               # Atomic components
│       ├── Badge.tsx     # Custom pill tags
│       ├── Button.tsx    # Customizable buttons with luxury gold styling
│       ├── Card.tsx      # Premium container panels
│       └── ProductCard.tsx # Premium product card component
├── hooks/                # Custom React hooks (empty for now)
├── lib/                  # Shareable configurations and helper functions
│   └── utils.ts          # Utility functions (cn, formatPrice)
├── public/               # Static assets
├── types/                # TypeScript type structures and interfaces
│   └── index.ts          # Common types (Product, User, CartItem, Order)
├── .env                  # Local secrets and config variables (ignored by Git)
├── .env.example          # Documentation template for configuration
├── .gitignore            # Version control exclusions
├── package.json          # Dependency scripts
├── tsconfig.json         # TypeScript compiler configurations
```

---

## Project Folder Architecture
```mermaid
graph TD
    Root[d/projects/LuxeGems]
    Root --> App[app/]
    Root --> Comp[components/]
    Root --> Lib[lib/]
    Root --> Types[types/]
    Root --> Hooks[hooks/]
    Root --> Pub[public/]

    App --> Layout["layout.tsx (Navbar & Footer)"]
    App --> Page["page.tsx (Hero Section)"]
    App --> Shop["shop/page.tsx (Shop Page)"]
    App --> CSS[globals.css]

    Comp --> UI[ui/]
    Comp --> LayoutComp[layout/]

    UI --> Button[Button.tsx]
    UI --> Card[Card.tsx]
    UI --> Badge[Badge.tsx]
    UI --> ProductCard[ProductCard.tsx]

    LayoutComp --> Navbar[Navbar.tsx]
    LayoutComp --> Footer[Footer.tsx]

    Lib --> Utils[utils.ts]
    Types --> TypeIndex[index.ts]
```

---

## Component Hierarchy Architecture
```mermaid
graph TD
    subgraph Global Layout
        Layout[layout.tsx] --> Navbar[Navbar]
        Layout --> Footer[Footer]
    end

    subgraph Shop Page
        Shop[shop/page.tsx] --> ProductCard[ProductCard]
    end
```

---

## Planned App Routes & Flowchart
This diagram outlines the target URL structure and user navigation pages planned for development:

```mermaid
graph TD
    Home["Home (/)"]
    Collections["Collections (/collections)"]
    ProductDetail["Product Detail (/product/:id)"]
    Cart["Cart (/cart)"]
    Checkout["Checkout (/checkout)"]
    OrderConfirm["Order Confirmation (/order-confirmation/:id)"]
    Dashboard["User Dashboard (/dashboard)"]
    Admin["Admin Catalog (/admin)"]

    Home --> Collections
    Home --> ProductDetail
    Collections --> ProductDetail
    ProductDetail --> Cart
    Cart --> Checkout
    Checkout --> OrderConfirm
    Home --> Dashboard
    Home --> Admin
```

---

## Shopping Cart State Transitions
This state machine illustrates the user actions and mutations that drive the global cart state:

```mermaid
stateDiagram-v2
    [*] --> Empty : Cart Initialized
    
    Empty --> HasItems : ADD_TO_CART (First Item)
    
    HasItems --> HasItems : ADD_TO_CART (Additional Items)
    HasItems --> HasItems : UPDATE_QUANTITY (Clamped quantity >= 1)
    HasItems --> HasItems : REMOVE_FROM_CART (Items remaining)
    
    HasItems --> Empty : REMOVE_FROM_CART (Last item removed)
    HasItems --> Empty : CLEAR_CART
    
    HasItems --> Checkout : Click Proceed to Checkout
    Checkout --> Empty : Order Processed Successfully
    Checkout --> HasItems : Exit Checkout / Modify Items
```

---

## Setup Instructions

### Prerequisites
- Node.js version 18.x or 20.x
- npm or another preferred package manager

### Installation Steps
1. Clone or access the workspace root `d:\projects\LuxeGems`.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Set up the local environment file:
   - Copy `.env.example` to create `.env`:
     ```bash
     cp .env.example .env
     ```
   - Supply placeholder credentials for database URIs and Stripe.
4. Run the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the homepage.

---

## What is Coming Next
In the next session (**Commit 3**), we will implement:
- MongoDB connection config using Mongoose.
- Product schemas and seed data containing premium catalog items.
- Dynamic page routing for Catalog Collections and Product Detail pages.
- Client state integration for the shopping cart hooks.
