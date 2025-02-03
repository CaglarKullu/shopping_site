// interfaces.ts

// Interface for the product details
export interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    popular: boolean;
    discount: number;
  }
  
  // Interface for the overall API response
  export interface ProductResponse {
    status: string; // e.g., "SUCCESS" | "ERROR"
    message: string;
    products: Product[];
  }
  