# EcomStore - Complete Ecommerce Website

A modern, fully-featured ecommerce website built with React, TypeScript, and TailwindCSS.

## Features

### 🛍️ Shopping Experience

- **Product Catalog**: Browse products across multiple categories
- **Advanced Search & Filtering**: Filter by category, brand, price, rating
- **Product Details**: Detailed product pages with images, specifications, and reviews
- **Shopping Cart**: Add/remove items, adjust quantities, persistent cart state
- **Wishlist**: Save products for later (demo functionality)

### 🔐 User Authentication

- **User Registration & Login**: Complete authentication system
- **User Profile**: Manage personal information and view order history
- **Protected Routes**: Secure checkout and profile pages

### 💳 Checkout & Orders

- **Secure Checkout**: Multi-step checkout process with shipping and payment
- **Order Management**: View order history and track orders
- **Payment Processing**: Mock payment integration (demo)

### 🎨 User Interface

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with Radix UI components
- **Dark Mode Support**: Built-in theme switching capabilities
- **Accessibility**: ARIA labels and keyboard navigation support

### 🚀 Technical Features

- **State Management**: React Context for cart and authentication
- **Routing**: React Router 6 with protected routes
- **Form Handling**: Comprehensive form validation
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error boundaries and 404 pages

## Pages

### Public Pages

- **Homepage** (`/`) - Hero section, featured products, categories
- **Products** (`/products`) - Product listing with filters and search
- **Product Detail** (`/product/:id`) - Individual product information
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration

### Protected Pages

- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Secure order placement
- **Profile** (`/profile`) - User account management
- **Order Success** (`/order-success`) - Order confirmation

## Components

### Layout Components

- **Header** - Navigation, search, cart, user menu
- **Footer** - Links, newsletter signup, contact info
- **CartSidebar** - Slide-out shopping cart

### Product Components

- **ProductCard** - Individual product display
- **ProductGrid** - Product listing layout
- **HeroSection** - Homepage hero banner

### Cart Components

- **CartItem** - Individual cart item with quantity controls
- **CartSummary** - Order totals and checkout

## Data & State Management

### Context Providers

- **CartContext** - Shopping cart state and actions
- **AuthContext** - User authentication and profile

### Mock Data

- **Products** - 8 sample products across 6 categories
- **Categories** - Electronics, Clothing, Home & Garden, Sports, Books, Beauty
- **User Data** - Demo user profiles and order history

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Demo Credentials

For testing the authentication system:

- **Email**: demo@example.com
- **Password**: demo123

## Technology Stack

### Core

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 6** - Client-side routing

### Styling

- **TailwindCSS 3** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Animation library

### State & Data

- **React Context** - State management
- **TanStack Query** - Data fetching (ready for backend integration)
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Testing framework

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components (Header, Footer)
│   ├── product/         # Product-related components
│   ├── cart/            # Shopping cart components
│   └── hero/            # Homepage hero section
├── pages/               # Page components
├── context/             # React Context providers
├── data/                # Mock data and constants
├── types/               # TypeScript type definitions
├── lib/                 # Utility functions
└── hooks/               # Custom React hooks
```

## Features to Add

### Backend Integration

- Real user authentication with JWT
- Product database with search/filtering
- Order processing and payment integration
- User reviews and ratings
- Inventory management

### Enhanced Features

- Real-time chat support
- Product recommendations
- Advanced search with autocomplete
- Email notifications
- Multi-language support
- Admin dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@ecomstore.com or join our Discord community.
