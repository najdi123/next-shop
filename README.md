Next.js 15 E-commerce Store 🛍️
This is a Next.js 15 e-commerce project that includes product listing, filtering (by color & size), a shopping cart, and customer reviews.

🚀 Tech Stack
Next.js 15 (App Router)
Redux Toolkit & RTK Query (State Management & API calls)
ShadCN (UI Components)
React Hook Form (Form Handling)
📌 API Routes
GET /api/products - Fetches all products
GET /api/product/[id] - Fetches a single product by ID
POST /api/product/[id]/review - Adds a review to a product
⚙️ How It Works
Products are fetched from an API and displayed using SSR and RTK Query.
Users can filter products by color and size.
The shopping cart is managed with Redux.
Users can write reviews, which are optimistically updated in the UI.
🔧 Setup
Install dependencies:
npm install

Run the development server:
npm run dev
Open http://localhost:3000 in your browser.
