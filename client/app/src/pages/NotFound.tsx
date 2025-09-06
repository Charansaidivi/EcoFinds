import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/common/Header";
import  Footer  from "@/components/common/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="text-8xl font-bold text-primary mb-4">404</div>
            <h1 className="text-3xl font-bold mb-4">Page not found</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Looking for something specific? Try browsing our categories or use the search bar to find eco-friendly products.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
