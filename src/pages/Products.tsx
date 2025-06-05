import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SortAsc, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import ProductGrid from "@/components/product/ProductGrid";
import { products, categories } from "@/data/products";
import { Product } from "@/types";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Get filters from URL params
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";
  const featuredFilter = searchParams.get("featured") === "true";
  const sortBy = searchParams.get("sort") || "relevance";

  // Local filter states
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFilter ? [categoryFilter] : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  // Get unique brands from products
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (
        localSearch &&
        !product.name.toLowerCase().includes(localSearch.toLowerCase()) &&
        !product.description
          .toLowerCase()
          .includes(localSearch.toLowerCase()) &&
        !product.brand.toLowerCase().includes(localSearch.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // Brand filter
      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (product.rating < minRating) {
        return false;
      }

      // Featured filter
      if (featuredFilter && (!product.originalPrice || product.rating < 4.5)) {
        return false;
      }

      return true;
    });
  }, [
    localSearch,
    selectedCategories,
    selectedBrands,
    priceRange,
    minRating,
    featuredFilter,
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "popular":
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands((prev) => [...prev, brand]);
    } else {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (localSearch) {
      params.set("search", localSearch);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setLocalSearch("");
    setSearchParams({});
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium">
          Search Products
        </Label>
        <form onSubmit={handleSearch} className="mt-2">
          <div className="flex space-x-2">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <Label className="text-sm font-medium">Categories</Label>
        <div className="mt-3 space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.name, checked as boolean)
                }
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category.name} ({category.productCount})
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <Label className="text-sm font-medium">Brands</Label>
        <div className="mt-3 space-y-3 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) =>
                  handleBrandChange(brand, checked as boolean)
                }
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm font-normal cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <div className="mt-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <Label className="text-sm font-medium">Minimum Rating</Label>
        <RadioGroup
          value={minRating.toString()}
          onValueChange={(value) => setMinRating(parseInt(value))}
          className="mt-3"
        >
          {[0, 1, 2, 3, 4].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <RadioGroupItem
                value={rating.toString()}
                id={`rating-${rating}`}
              />
              <Label htmlFor={`rating-${rating}`} className="cursor-pointer">
                {rating === 0 ? "All ratings" : `${rating}+ stars`}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          Showing {sortedProducts.length} of {products.length} products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <FilterContent />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-secondary/20 rounded-lg">
            <div className="flex items-center space-x-4">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={sortedProducts} />
        </main>
      </div>
    </div>
  );
};

export default Products;
