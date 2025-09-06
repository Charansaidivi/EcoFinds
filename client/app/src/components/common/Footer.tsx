import { Link } from "react-router-dom";
import { Heart, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">E</span>
              </div>
              <span className="font-bold text-xl text-gradient">EcoFinds</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover pre-loved treasures and give items a second life. 
              Building a sustainable future, one purchase at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/listings/new" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link to="/my-listings" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Listings
                </Link>
              </li>
              <li>
                <Link to="/purchases" className="text-muted-foreground hover:text-foreground transition-colors">
                  Purchase History
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Electronics</span>
              </li>
              <li>
                <span className="text-muted-foreground">Furniture</span>
              </li>
              <li>
                <span className="text-muted-foreground">Fashion</span>
              </li>
              <li>
                <span className="text-muted-foreground">Books</span>
              </li>
            </ul>
          </div>

          {/* Sustainability */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Leaf className="h-4 w-4 mr-2 text-primary" />
              Our Impact
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Items given second life: 1,247+</p>
              <p>CO₂ saved: 2.1 tons</p>
              <p>Waste diverted: 890 lbs</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 EcoFinds. Built with sustainability in mind.
          </p>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-4 sm:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive fill-current" />
            <span>for the planet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}