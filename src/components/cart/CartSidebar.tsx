import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { items, isOpen, closeCart, totalPrice, totalItems, clearCart } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart ({totalItems})
            </span>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground">
                Your cart is empty
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                Add some products to get started
              </p>
              <Button asChild onClick={closeCart}>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.product.id}>
                  <CartItem item={item} />
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" asChild onClick={closeCart}>
                <Link to="/cart">View Cart</Link>
              </Button>
              <Button asChild onClick={closeCart}>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full"
              asChild
              onClick={closeCart}
            >
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
