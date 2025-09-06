export const CATEGORIES = [
  "Electronics",
  "Furniture", 
  "Fashion",
  "Books",
  "Home & Kitchen",
  "Sports",
  "Toys",
  "Appliances",
  "Other"
] as const;

export type Category = typeof CATEGORIES[number];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
] as const;

export type SortOption = typeof SORT_OPTIONS[number]["value"];

export const PLACEHOLDER_IMAGES = {
  electronics: "/api/placeholder/400/300?text=Electronics",
  furniture: "/api/placeholder/400/300?text=Furniture", 
  fashion: "/api/placeholder/400/300?text=Fashion",
  books: "/api/placeholder/400/300?text=Books",
  "home-kitchen": "/api/placeholder/400/300?text=Home+Kitchen",
  sports: "/api/placeholder/400/300?text=Sports",
  toys: "/api/placeholder/400/300?text=Toys",
  appliances: "/api/placeholder/400/300?text=Appliances",
  other: "/api/placeholder/400/300?text=Other",
} as const;