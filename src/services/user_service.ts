import axios from 'axios';
import { UsersResponse } from '../interfaces/user_response_interface';



export async function fetchUsers(): Promise<UsersResponse> {
  try {
    const response = await axios.get<UsersResponse>('https://fakestoreapi.in/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
