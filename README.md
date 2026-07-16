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
│   ├── cart/             # Cart Pages
│   │   └── page.tsx      # Full cart page with tabular items summary
│   ├── checkout/         # Checkout Pages
│   │   └── page.tsx      # Multi-step checkout form layout
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
│       ├── FormField.tsx # Reusable labeled input field
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

## Product Schema Database ER Diagram
This diagram represents the structural database properties modeled for each catalog product:

```mermaid
erDiagram
    PRODUCT {
        ObjectId _id PK "Unique Mongoose Identifier"
        String name "Jewelry Display Name"
        Number price "Price in cents (e.g. 245000)"
        String category "Category catalog name (Rings, Necklaces, etc.)"
        String image "Visual Unsplash Image asset URL"
        String description "Craftsmanship design notes specifications"
        Number stock "Quantity inventory level count"
        Boolean isNew "New arrival badge display status"
        Boolean isFeatured "Signature featured product highlight flag"
        Date createdAt "Database entry creation timestamp"
        Date updatedAt "Database entry modification timestamp"
    }
```

---

## API Endpoints Reference
The backend exposes the following API routes for querying the catalog database, managing checkouts, and tracking orders:

| Method | Path | Query Parameters / Payload | Description | Response Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/products` | `category` (optional filter)<br>`featured` (optional boolean) | Fetches a list of products from MongoDB filtered by criteria. | `200 OK` (list)<br>`500 Error` |
| **GET** | `/api/products/[id]` | None | Fetches detailed attributes for a single product. | `200 OK` (details)<br>`404 Not Found`<br>`500 Error` |
| **POST** | `/api/checkout` | JSON checkout payload (items, customerInfo, shippingAddress, totalAmount) | Creates a pending order and constructs a Stripe Checkout session. | `200 OK` (session URL)<br>`400 Bad Request`<br>`500 Error` |
| **POST** | `/api/webhook` | Raw Stripe signature headers and body payload | Receives asynchronous event callbacks from Stripe to update order status. | `200 OK` (processed)<br>`400 Invalid Signature`<br>`500 Server Error` |
| **GET** | `/api/orders/[trackingId]` | None | Retrieves customer order details, status, and shipping logs. | `200 OK` (order data)<br>`404 Not Found`<br>`500 Error` |

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

## Checkout Flow Sequence
This sequence diagram details the interaction steps of a customer proceeding from their Cart page through form validations to completing order checkout:

```mermaid
sequenceDiagram
    autonumber
    actor Client as Client / User
    participant Cart as Cart Page (/cart)
    participant Form as Checkout Form (/checkout)
    participant State as Cart Context State

    Client->>Cart: View Selected Items
    Cart->>Client: Display Tabular Items & Subtotal
    Client->>Cart: Click "Proceed to Checkout"
    Cart->>Form: Redirect to Checkout Page
    Note over Form: Step 1: Contact Specifications
    Client->>Form: Input Name, Email, Phone
    Form->>Form: Validate Input fields (Zod)
    Client->>Form: Click "Next Step"
    Note over Form: Step 2: Shipping Location
    Client->>Form: Input Address, City, State, ZIP
    Form->>Form: Validate Location fields (Zod)
    Client->>Form: Click "Next Step"
    Note over Form: Step 3: Review Order
    Form->>State: Fetch Cart Items & Total Amount
    Form->>Client: Present Client Data & Items Summary
    Client->>Form: Click "Place Order"
    Form->>Form: Dispatch Final Submit
    Form->>State: Dispatch CLEAR_CART Action
    State-->>Form: Cart Emptied
    Form->>Client: Render Success Confirmation Panel
```

---

## Secure Payment and Webhook Flow
This sequence diagram illustrates the lifecycle of a secure credit card charge processing via the Stripe Checkout portal, asynchronous signature verification callbacks, and MongoDB status updates:

```mermaid
sequenceDiagram
    autonumber
    actor Client as Frontend Client
    participant API as Checkout API (/api/checkout)
    participant Stripe as Stripe Checkout Hosted Page
    participant Webhook as Webhook Listener (/api/webhook)
    participant DB as MongoDB Database Order Table

    Client->>API: POST Checkout request (items, customerInfo, shippingAddress, totalAmount)
    API->>API: Generate unique trackingId (format: LG-XXXX-XXXX)
    API->>DB: Save pending order with status: "Pending" and stripeSessionId
    API->>Stripe: Create checkout session
    Stripe-->>API: Return Checkout session details & redirect URL
    API-->>Client: Return session redirect URL
    Client->>Stripe: Redirect and enter card details
    Stripe->>Stripe: Process charge
    Note over Stripe: Payment Captured Successfully
    Stripe-->>Client: Redirect to /order-success?trackingId=LG-XXXX-XXXX
    Stripe->>Webhook: Async POST webhook event (checkout.session.completed)
    Webhook->>Webhook: Verify signature using STRIPE_WEBHOOK_SECRET
    alt Signature Valid
        Webhook->>DB: Find order by stripeSessionId and update status to "Paid"
        DB-->>Webhook: Order updated
        Webhook-->>Stripe: Respond HTTP 200 OK
    else Signature Invalid
        Webhook-->>Stripe: Respond HTTP 400 Bad Request
    end
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
In the next session (**Commit 7**), we will implement:
- User Authentication (credentials or passwordless login).
- Protected pages for order tracking and user settings.
- Administrator control panels.
