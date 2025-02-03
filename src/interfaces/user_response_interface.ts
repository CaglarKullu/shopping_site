
export interface Geolocation {
    lat: number;
    long: number;
  }
  

  export interface Address {
    city: string;
    street: string;
    number: string;
    zipcode: string;
    geolocation: Geolocation;
  }
  

  export interface Name {
    firstname: string;
    lastname: string;
  }
    export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: Name;
    address: Address;
    phone: string;
  }
  

  export interface UsersResponse {
    status: string;    
    message: string;  
    users: User[];
  }
  