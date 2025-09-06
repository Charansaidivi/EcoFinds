import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Plus, LogOut, Settings, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useDebounce } from "@/hooks/useDebounce";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function Header({ onSearch, searchQuery = "" }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  const debouncedSearch = useDebounce(localSearchQuery, 300);

  // Effect to call onSearch when debounced value changes
  React.useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">E</span>
          </div>
          <span className="font-bold text-xl text-gradient">EcoFinds</span>
        </Link>

        {/* Search Bar */}
        {onSearch && (
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for eco-friendly products..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Add Product Button */}
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden sm:inline-flex"
              >
                <Link to="/listings/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Sell Item
                </Link>
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="sm" asChild className="relative">
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                      <AvatarFallback>{user?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.username}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-listings">
                      <Package className="mr-2 h-4 w-4" />
                      My Listings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/purchases">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Purchases
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;