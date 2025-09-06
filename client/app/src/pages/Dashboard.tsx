import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Save, Package, ShoppingCart, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/hooks/useAuth";
import { mockProducts, mockOrders } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || ""
  });

  // Fetch user profile and stats
  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const res = await api.get("/api/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Fetched user profile:", res.data);
      // console.log("User ID:", res.data.listedCount);
      setUser({
        ...res.data,
        _id: res.data.id,
      });
      console.log("API user data:", res.data);
    };
    fetchProfile();
  }, [setUser]);

  useEffect(() => {
    console.log("Updated user state:", user);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-muted-foreground mb-8">
            You need to be logged in to view your dashboard.
          </p>
          <Button asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const userProducts = mockProducts.filter(p => p.ownerId === user.id);
  const userOrders = mockOrders.filter(o => o.userId === user.id);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const success = await updateProfile({
        username: formData.username,
        email: formData.email
      });

      if (success) {
        setIsEditing(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
      } else {
        toast({
          title: "Update failed",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: user.email
    });
    setIsEditing(false);
  };
 const stats = [
  {
    title: "Active Listings",
    value: Array.isArray(user.listedCount) ? user.listedCount.length : 2,
    icon: Package,
    color: "text-primary",
    href: "/my-listings",
  },
  {
    title: "Total Orders",
    value: Array.isArray(user.purchasedCount) ? user.purchasedCount.length : 0,
    icon: ShoppingCart,
    color: "text-accent",
    href: "/purchases",
  },
  {
    title: "Total Earned",
    value: `$${user.totalEarned ?? 20}`,
    icon: Eye,
    color: "text-success",
    href: "/my-listings",
  },
];


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Profile Information
                      {!isEditing && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Manage your account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user.avatarUrl} alt={user.username} />
                        <AvatarFallback className="text-2xl">
                          {user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Badge variant="secondary">
                        Member since {new Date(user.createdAt).getFullYear()}
                      </Badge>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                          disabled={!isEditing || isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing || isLoading}
                        />
                      </div>

                      {isEditing && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={handleSave}
                            disabled={isLoading}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {isLoading ? "Saving..." : "Save"}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleCancel}
                            disabled={isLoading}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Dashboard Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Welcome */}
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {user.username}!</h1>
                  <p className="text-muted-foreground">
                    Here's an overview of your EcoFinds activity.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.map((stat) => (
                    <Card key={stat.title} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                          </div>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={stat.href}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks you might want to perform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button asChild className="h-16 text-left">
                        <Link to="/listings/new" className="flex items-center justify-start space-x-4">
                          <Package className="h-6 w-6" />
                          <div>
                            <div className="font-semibold">Sell an Item</div>
                            <div className="text-sm opacity-70">Create a new listing</div>
                          </div>
                        </Link>
                      </Button>
                      
                      <Button variant="outline" asChild className="h-16 text-left">
                        <Link to="/my-listings" className="flex items-center justify-start space-x-4">
                          <Edit className="h-6 w-6" />
                          <div>
                            <div className="font-semibold">Manage Listings</div>
                            <div className="text-sm opacity-70">Edit your products</div>
                          </div>
                        </Link>
                      </Button>
                      
                      <Button variant="outline" asChild className="h-16 text-left">
                        <Link to="/purchases" className="flex items-center justify-start space-x-4">
                          <ShoppingCart className="h-6 w-6" />
                          <div>
                            <div className="font-semibold">View Purchases</div>
                            <div className="text-sm opacity-70">See your order history</div>
                          </div>
                        </Link>
                      </Button>
                      
                      <Button variant="outline" asChild className="h-16 text-left">
                        <Link to="/" className="flex items-center justify-start space-x-4">
                          <Eye className="h-6 w-6" />
                          <div>
                            <div className="font-semibold">Browse Products</div>
                            <div className="text-sm opacity-70">Discover new items</div>
                          </div>
                        </Link>
                      </Button>
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

export default Dashboard;