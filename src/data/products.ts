import { Product, Category } from "../types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    productCount: 156,
  },
  {
    id: "2",
    name: "Clothing",
    slug: "clothing",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    productCount: 234,
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    productCount: 89,
  },
  {
    id: "4",
    name: "Sports",
    slug: "sports",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    productCount: 67,
  },
  {
    id: "5",
    name: "Books",
    slug: "books",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    productCount: 123,
  },
  {
    id: "6",
    name: "Beauty",
    slug: "beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
    productCount: 78,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 199.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
    ],
    category: "Electronics",
    brand: "AudioTech",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    features: [
      "Active Noise Cancellation",
      "30-hour battery",
      "Quick charge",
      "Bluetooth 5.0",
    ],
    specifications: {
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0",
    },
  },
  {
    id: "2",
    name: "Smartphone 128GB",
    description:
      "Latest smartphone with advanced camera system and lightning-fast performance.",
    price: 699.99,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    category: "Electronics",
    brand: "TechPro",
    rating: 4.7,
    reviewCount: 256,
    inStock: true,
    features: [
      "128GB Storage",
      "Triple Camera",
      "5G Ready",
      "Wireless Charging",
    ],
    specifications: {
      Storage: "128GB",
      RAM: "8GB",
      Display: '6.1"',
      Camera: "48MP Triple Camera",
    },
  },
  {
    id: "3",
    name: "Laptop Backpack",
    description:
      "Professional laptop backpack with USB charging port and water-resistant material.",
    price: 49.99,
    originalPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    category: "Electronics",
    brand: "UrbanCarry",
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    features: [
      "USB Charging Port",
      "Water Resistant",
      "Laptop Compartment",
      "Anti-theft Design",
    ],
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt perfect for everyday wear.",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    category: "Clothing",
    brand: "ComfortWear",
    rating: 4.2,
    reviewCount: 45,
    inStock: true,
    features: [
      "100% Cotton",
      "Machine Washable",
      "Pre-shrunk",
      "Various Colors",
    ],
  },
  {
    id: "5",
    name: "Running Shoes",
    description:
      "Lightweight running shoes with advanced cushioning technology.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    category: "Sports",
    brand: "SportMax",
    rating: 4.6,
    reviewCount: 167,
    inStock: true,
    features: [
      "Lightweight Design",
      "Advanced Cushioning",
      "Breathable Mesh",
      "Durable Sole",
    ],
  },
  {
    id: "6",
    name: "Coffee Maker",
    description:
      "Programmable coffee maker with built-in grinder and thermal carafe.",
    price: 159.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    category: "Home & Garden",
    brand: "BrewMaster",
    rating: 4.4,
    reviewCount: 92,
    inStock: true,
    features: [
      "Built-in Grinder",
      "Programmable",
      "Thermal Carafe",
      "12-cup Capacity",
    ],
  },
  {
    id: "7",
    name: "JavaScript Programming Book",
    description:
      "Comprehensive guide to modern JavaScript programming techniques.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    category: "Books",
    brand: "TechBooks",
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    features: [
      "Latest ES6+ Features",
      "Practical Examples",
      "500+ Pages",
      "Beginner Friendly",
    ],
  },
  {
    id: "8",
    name: "Skincare Set",
    description:
      "Complete skincare routine set with cleanser, toner, and moisturizer.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
    category: "Beauty",
    brand: "GlowUp",
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    features: [
      "All Skin Types",
      "Natural Ingredients",
      "3-Step Routine",
      "Cruelty Free",
    ],
  },
];

export const featuredProducts = products.slice(0, 4);
export const newArrivals = products.slice(2, 6);
export const bestSellers = products.filter((p) => p.rating >= 4.5);
