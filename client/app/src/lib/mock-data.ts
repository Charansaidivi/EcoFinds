import { Product, User, Order } from "@/types";
import { CATEGORIES } from "./constants";

export const mockUsers: User[] = [
  {
    id: "demo-user",
    email: "demo@ecofinds.com",
    username: "DemoUser",
    avatarUrl: "/api/placeholder/100/100?text=DU",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "seller-user", 
    email: "seller@ecofinds.com",
    username: "EcoSeller",
    avatarUrl: "/api/placeholder/100/100?text=ES",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

export const mockProducts: Product[] = [
  {
    id: "1",
    ownerId: "seller-user",
    ownerUsername: "EcoSeller",
    title: "iPhone 12 Pro - Excellent Condition",
    description: "Barely used iPhone 12 Pro in excellent condition. Includes original box and charger. No scratches or damage.",
    category: "Electronics",
    price: 599,
    imageUrl: "/api/placeholder/400/300?text=iPhone+12+Pro",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "2", 
    ownerId: "seller-user",
    ownerUsername: "EcoSeller",
    title: "Vintage Mid-Century Modern Chair",
    description: "Beautiful vintage mid-century modern accent chair. Reupholstered in sustainable fabric. Perfect for any living space.",
    category: "Furniture",
    price: 250,
    imageUrl: "/api/placeholder/400/300?text=Vintage+Chair",
    createdAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-14T15:30:00Z"
  },
  {
    id: "3",
    ownerId: "demo-user", 
    ownerUsername: "DemoUser",
    title: "Sustainable Cotton Dress",
    description: "Organic cotton summer dress in excellent condition. Size Medium. Perfect for eco-conscious fashion lovers.",
    category: "Fashion",
    price: 45,
    imageUrl: "/api/placeholder/400/300?text=Cotton+Dress",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    ownerId: "seller-user",
    ownerUsername: "EcoSeller", 
    title: "Programming Books Collection",
    description: "Collection of 5 programming books including Clean Code, Design Patterns, and more. Great for developers.",
    category: "Books",
    price: 75,
    imageUrl: "/api/placeholder/400/300?text=Programming+Books",
    createdAt: "2024-01-12T14:20:00Z",
    updatedAt: "2024-01-12T14:20:00Z"
  },
  {
    id: "5",
    ownerId: "demo-user",
    ownerUsername: "DemoUser",
    title: "Bamboo Kitchen Utensil Set", 
    description: "Eco-friendly bamboo kitchen utensil set. Includes spatula, spoons, and tongs. Sustainable and durable.",
    category: "Home & Kitchen",
    price: 25,
    imageUrl: "/api/placeholder/400/300?text=Bamboo+Utensils",
    createdAt: "2024-01-11T16:45:00Z",
    updatedAt: "2024-01-11T16:45:00Z"
  },
  {
    id: "6",
    ownerId: "seller-user",
    ownerUsername: "EcoSeller",
    title: "Yoga Mat & Blocks Set",
    description: "Non-slip yoga mat with two blocks. Made from natural materials. Perfect for home practice.",
    category: "Sports",
    price: 40,
    imageUrl: "/api/placeholder/400/300?text=Yoga+Set",
    createdAt: "2024-01-10T11:30:00Z",
    updatedAt: "2024-01-10T11:30:00Z"
  },
  {
    id: "7",
    ownerId: "demo-user",
    ownerUsername: "DemoUser", 
    title: "Wooden Building Blocks",
    description: "High-quality wooden building blocks for children. Educational and eco-friendly. Ages 3+.",
    category: "Toys",
    price: 35,
    imageUrl: "/api/placeholder/400/300?text=Wooden+Blocks",
    createdAt: "2024-01-09T13:15:00Z",
    updatedAt: "2024-01-09T13:15:00Z"
  },
  {
    id: "8",
    ownerId: "seller-user",
    ownerUsername: "EcoSeller",
    title: "Energy Efficient Blender",
    description: "High-performance blender with multiple speed settings. Energy efficient and powerful motor.",
    category: "Appliances", 
    price: 85,
    imageUrl: "/api/placeholder/400/300?text=Blender",
    createdAt: "2024-01-08T08:00:00Z",
    updatedAt: "2024-01-08T08:00:00Z"
  },
  {
    id: "9",
    ownerId: "demo-user",
    ownerUsername: "DemoUser",
    title: "Macbook Air M1 - Like New",
    description: "MacBook Air with M1 chip, 8GB RAM, 256GB SSD. Barely used, includes original packaging and accessories.",
    category: "Electronics",
    price: 899,
    imageUrl: "/api/placeholder/400/300?text=MacBook+Air",
    createdAt: "2024-01-07T12:45:00Z",
    updatedAt: "2024-01-07T12:45:00Z"
  },
  {
    id: "10",
    ownerId: "seller-user",
    ownerUsername: "EcoSeller",
    title: "Reclaimed Wood Coffee Table",
    description: "Beautiful coffee table made from reclaimed wood. Unique character and sustainable choice for your living room.",
    category: "Furniture",
    price: 180,
    imageUrl: "/api/placeholder/400/300?text=Coffee+Table",
    createdAt: "2024-01-06T17:20:00Z",
    updatedAt: "2024-01-06T17:20:00Z"
  },
  {
    id: "11",
    ownerId: "demo-user",
    ownerUsername: "DemoUser",
    title: "Designer Handbag - Authentic",
    description: "Authentic designer leather handbag in excellent condition. Timeless style and premium quality.",
    category: "Fashion",
    price: 320,
    imageUrl: "/api/placeholder/400/300?text=Designer+Handbag",
    createdAt: "2024-01-05T19:10:00Z",
    updatedAt: "2024-01-05T19:10:00Z"
  },
  {
    id: "12",
    ownerId: "seller-user",
    ownerUsername: "EcoSeller",
    title: "Cookbook Collection - Healthy Eating",
    description: "Collection of 8 cookbooks focused on healthy, sustainable eating. Perfect for food enthusiasts.",
    category: "Books",
    price: 60,
    imageUrl: "/api/placeholder/400/300?text=Cookbooks",
    createdAt: "2024-01-04T14:35:00Z",
    updatedAt: "2024-01-04T14:35:00Z"
  },
  {
    id: "13",
    ownerId: "demo-user",
    ownerUsername: "DemoUser",
    title: "Ceramic Dinnerware Set",
    description: "Beautiful 16-piece ceramic dinnerware set. Lead-free and dishwasher safe. Perfect for everyday use.",
    category: "Home & Kitchen",
    price: 95,
    imageUrl: "/api/placeholder/400/300?text=Dinnerware+Set",
    createdAt: "2024-01-03T10:25:00Z",
    updatedAt: "2024-01-03T10:25:00Z"
  },
  {
    id: "14",
    ownerId: "seller-user",
    ownerUsername: "EcoSeller",
    title: "Mountain Bike - Well Maintained",
    description: "26-inch mountain bike in great condition. Recently serviced with new tires. Perfect for trail riding.",
    category: "Sports",
    price: 285,
    imageUrl: "/api/placeholder/400/300?text=Mountain+Bike",
    createdAt: "2024-01-02T16:50:00Z",
    updatedAt: "2024-01-02T16:50:00Z"
  },
  {
    id: "15",
    ownerId: "demo-user",
    ownerUsername: "DemoUser",
    title: "Educational STEM Kit",
    description: "Complete STEM learning kit for kids. Includes experiments and building projects. Ages 8-14.",
    category: "Toys",
    price: 55,
    imageUrl: "/api/placeholder/400/300?text=STEM+Kit",
    createdAt: "2024-01-01T20:15:00Z",
    updatedAt: "2024-01-01T20:15:00Z"
  },
  {
    id: "16",
    ownerId: "seller-user",
    ownerUsername: "EcoSeller",
    title: "Smart Air Purifier",
    description: "Wi-Fi enabled air purifier with HEPA filter. Energy efficient and quiet operation. Great for allergies.",
    category: "Appliances",
    price: 150,
    imageUrl: "/api/placeholder/400/300?text=Air+Purifier",
    createdAt: "2023-12-31T11:40:00Z",
    updatedAt: "2023-12-31T11:40:00Z"
  }
];

export const mockOrders: Order[] = [
  {
    id: "order-1",
    userId: "demo-user",
    items: [
      {
        productId: "1",
        titleSnapshot: "iPhone 12 Pro - Excellent Condition",
        priceSnapshot: 599,
        quantity: 1
      },
      {
        productId: "5",
        titleSnapshot: "Bamboo Kitchen Utensil Set",
        priceSnapshot: 25,
        quantity: 2
      }
    ],
    total: 649,
    createdAt: "2024-01-20T14:30:00Z"
  }
];