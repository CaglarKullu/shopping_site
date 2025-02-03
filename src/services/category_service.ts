import axios from 'axios';
import { CategoriesResponse } from '../interfaces/category_interface';


export async function fetchCategories(): Promise<CategoriesResponse> {
  try {
    const response = await axios.get<CategoriesResponse>('https://fakestoreapi.in/api/products/category');
    return response.data;
  } catch (error) {
    // Optionally refine the error handling here
    throw new Error('Error fetching categories');
  }
}
