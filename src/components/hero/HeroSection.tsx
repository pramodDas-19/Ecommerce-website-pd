import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Free shipping on orders over $50
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Amazing
                <span className="text-primary block">Products</span>
                at Great Prices
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Shop from thousands of products across multiple categories.
                Quality guaranteed, fast delivery, and exceptional customer
                service.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/products?featured=true">View Featured Products</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-primary mr-1" />
                  <span className="text-2xl font-bold">50K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ShoppingBag className="h-5 w-5 text-primary mr-1" />
                  <span className="text-2xl font-bold">10K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-primary mr-1" />
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Shopping Experience"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />

              {/* Floating Cards */}
              <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Shopping</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary-foreground fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Trusted Store</p>
                    <p className="text-xs text-muted-foreground">
                      4.8/5 Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
