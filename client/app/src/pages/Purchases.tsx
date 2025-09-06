import { Link } from "react-router-dom";
import { ShoppingBag, Package, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/hooks/useAuth";
import { mockOrders } from "@/lib/mock-data";
import { formatDistanceToNow, format } from "date-fns";

const Purchases = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-muted-foreground mb-8">
            You need to be logged in to view your purchases.
          </p>
          <Button asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const userOrders = mockOrders.filter(order => order.userId === user.id);

  if (userOrders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">No purchases yet</h1>
          <p className="text-muted-foreground mb-8">
            Start shopping to see your order history here.
          </p>
          <Button asChild>
            <Link to="/">Browse Products</Link>
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
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Purchase History</h1>
              <p className="text-muted-foreground">
                View your {userOrders.length} order{userOrders.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {userOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id.slice(-8).toUpperCase()}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(order.createdAt), "MMM dd, yyyy")}
                          </div>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </div>
                        <Badge variant="secondary">
                          <Package className="h-3 w-3 mr-1" />
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.titleSnapshot}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Quantity: {item.quantity}</span>
                                <span>•</span>
                                <span>Unit price: ${item.priceSnapshot.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">
                                ${(item.priceSnapshot * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                          {index < order.items.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        Download Receipt
                      </Button>
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Seller
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
              <Button asChild>
                <Link to="/">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Purchases;