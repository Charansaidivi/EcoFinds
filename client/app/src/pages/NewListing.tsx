import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import { CATEGORIES, PLACEHOLDER_IMAGES } from "@/lib/constants";
import { mockProducts } from "@/lib/mock-data";
import { Product, Category } from "@/types";
import { toast } from "@/hooks/use-toast";

const NewListing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ longitude: number; latitude: number } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as Category | "",
    price: "",
    image: null as File | null,
  });

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-muted-foreground mb-8">
            You need to be logged in to create a listing.
          </p>
          <Button asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support location capture.",
        variant: "destructive",
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        });
        toast({
          title: "Location captured!",
          description: "Your live location has been added.",
        });
      },
      () => {
        toast({
          title: "Location error",
          description: "Unable to capture your location.",
          variant: "destructive",
        });
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value as any);
    });
    if (location) {
      data.append("longitude", String(location.longitude));
      data.append("latitude", String(location.latitude));
    }

    // Get access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    try {
      await api.post("/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast({
        title: "Listing created!",
        description: "Your item has been successfully listed for sale.",
      });

      navigate("/my-listings");
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

  const getDefaultImageForCategory = (category: Category): string => {
    const categoryKey = category.toLowerCase().replace(" & ", "-").replace(" ", "-") as keyof typeof PLACEHOLDER_IMAGES;
    return PLACEHOLDER_IMAGES[categoryKey] || PLACEHOLDER_IMAGES.other;
  };

  const handleCategoryChange = (category: Category) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/my-listings">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to My Listings
              </Link>
            </Button>
          </div>
        </div>

        {/* Form */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create New Listing</CardTitle>
                <CardDescription>
                  Share your item with the eco-conscious community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="What are you selling?"
                      value={formData.title}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your item's condition, features, and why someone should buy it..."
                      value={formData.description}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      rows={4}
                    />
                  </div>

                  {/* Category and Price Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={handleCategoryChange}
                        disabled={isLoading}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label htmlFor="price">Price *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleChange}
                          disabled={isLoading}
                          required
                          min="0"
                          step="0.01"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Capture */}
                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <Button type="button" onClick={handleGetLocation} disabled={!!location || isLoading}>
                      {location ? "Location Captured" : "Capture Live Location"}
                    </Button>
                    {location && (
                      <div className="text-sm text-muted-foreground">
                        Longitude: {location.longitude}, Latitude: {location.latitude}
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Image *</Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  {/* Preview */}
                  {(formData.image || formData.category) && (
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div className="border border-border rounded-lg p-4">
                        <img
                          src={
                            formData.image
                              ? URL.createObjectURL(formData.image as File)
                              : formData.category
                                ? getDefaultImageForCategory(formData.category)
                                : ''
                          }
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Listing"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate("/my-listings")}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewListing;