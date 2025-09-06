import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { mockOrders } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleMockCheckout = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to checkout",
        variant: "destructive"
      });
      return;
    }

    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      // Create a mock order
      const newOrder = {
        id: `order-${Date.now()}`,
        userId: user.id,
        items: items.map(item => ({
          productId: item.productId,
          titleSnapshot: item.product.title,
          priceSnapshot: item.product.price,
          quantity: item.quantity
        })),
        total,
        createdAt: new Date().toISOString()
      };

      // Add to mock orders (in a real app, this would be an API call)
      mockOrders.push(newOrder);

      // Clear cart
      clearCart();

      // Show success message
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You can view your order in Purchase History.",
      });

      // Navigate to purchases page
      navigate("/purchases");
      setIsCheckingOut(false);
    }, 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-muted-foreground mb-8">
            You need to be logged in to view your cart.
          </p>
          <Button asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Start browsing our eco-friendly products to add items to your cart.
          </p>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        {/* Cart Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                
                {items.map((item) => (
                  <Card key={item.productId} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <Link 
                          to={`/listings/${item.productId}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg hover:opacity-90 transition-opacity"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 space-y-2">
                          <Link 
                            to={`/listings/${item.productId}`}
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            by {item.product.ownerUsername}
                          </p>
                          <p className="font-semibold text-primary">
                            ${item.product.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal ({items.length} items)</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-success">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleMockCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                    </Button>

                    <div className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={clearCart}
                        disabled={isCheckingOut}
                      >
                        Clear Cart
                      </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-4 space-y-2 text-sm text-muted-foreground text-center">
                      <p>✓ Secure checkout</p>
                      <p>✓ Free shipping on all orders</p>
                      <p>✓ 30-day return policy</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;