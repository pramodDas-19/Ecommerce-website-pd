import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const subtotal = totalPrice;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart before proceeding to checkout.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    section: "shipping" | "card",
    field: string,
    value: string,
  ) => {
    if (section === "shipping") {
      setShippingInfo((prev) => ({ ...prev, [field]: value }));
    } else {
      setCardInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateForm = () => {
    const requiredShippingFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "state",
      "zipCode",
    ];
    const missingShippingFields = requiredShippingFields.filter(
      (field) => !shippingInfo[field as keyof typeof shippingInfo],
    );

    if (missingShippingFields.length > 0) {
      toast.error("Please fill in all shipping information fields");
      return false;
    }

    if (paymentMethod === "credit-card") {
      const requiredCardFields = [
        "cardNumber",
        "expiryDate",
        "cvv",
        "cardholderName",
      ];
      const missingCardFields = requiredCardFields.filter(
        (field) => !cardInfo[field as keyof typeof cardInfo],
      );

      if (missingCardFields.length > 0) {
        toast.error("Please fill in all payment information fields");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/order-success");
    } catch (error) {
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-1">
            Complete your order securely
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            {!isAuthenticated && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-4">
                      Have an account? Sign in for faster checkout
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {isAuthenticated ? "1" : "2"}
                  </div>
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          "shipping",
                          "firstName",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        handleInputChange(
                          "shipping",
                          "lastName",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email || user?.email || ""}
                      onChange={(e) =>
                        handleInputChange("shipping", "email", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        handleInputChange("shipping", "phone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      handleInputChange("shipping", "address", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        handleInputChange("shipping", "city", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) =>
                        handleInputChange("shipping", "state", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        handleInputChange("shipping", "zipCode", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={shippingInfo.country}
                      onValueChange={(value) =>
                        handleInputChange("shipping", "country", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="MX">Mexico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {isAuthenticated ? "2" : "3"}
                  </div>
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label
                      htmlFor="credit-card"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="mt-4 space-y-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name *</Label>
                      <Input
                        id="cardholderName"
                        type="text"
                        value={cardInfo.cardholderName}
                        onChange={(e) =>
                          handleInputChange(
                            "card",
                            "cardholderName",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.cardNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "card",
                            "cardNumber",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          value={cardInfo.expiryDate}
                          onChange={(e) =>
                            handleInputChange(
                              "card",
                              "expiryDate",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) =>
                            handleInputChange("card", "cvv", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsBilling"
                        checked={sameAsBilling}
                        onCheckedChange={setSameAsBilling}
                      />
                      <Label htmlFor="sameAsBilling" className="text-sm">
                        Billing address same as shipping
                      </Label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={`${item.product.id}-${index}`}
                      className="flex items-center space-x-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Security Features */}
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    <span>SSL encrypted payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-3 w-3" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Place Order - ${total.toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
