import axios from 'axios';
import { Product, ProductResponse } from '../interfaces/product_interface';

export async function fetchAllProducts(): Promise<ProductResponse> {
    try {
      const response = await axios.get<ProductResponse>("https://fakestoreapi.in/api/products");
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching products ${error}`);
    }
  }

  export async function fetchProductById(id: number): Promise<Product> {
    try {
      const response = await axios.get<Product>(`https://fakestoreapi.in/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching product ${error}`);
    }
  }