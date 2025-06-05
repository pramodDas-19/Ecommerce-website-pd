import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.product.id);
    } else {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="h-16 w-16 rounded-md object-cover"
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-2">
          {item.product.name}
        </h4>
        <p className="text-sm text-muted-foreground">{item.product.brand}</p>
        <p className="text-sm font-semibold">${item.product.price}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => removeItem(item.product.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
