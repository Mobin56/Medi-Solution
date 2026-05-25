export interface Medicine {
  id: string;
  medicine_name: string;
  generic_name: string;
  company_name: string;
  company_id: string;
  category: string;
  type: "Tablet" | "Capsule" | "Syrup" | "Injection" | "Cream" | "Drops" | "Inhaler";
  description: string;
  usage: string;
  dosage: {
    adult: string;
    child: string;
    elderly: string;
    special_instructions: string;
  };
  side_effects: {
    common: string[];
    serious: string[];
  };
  precautions: {
    pregnancy: string;
    kidney: string;
    liver: string;
    allergy: string;
    drug_interaction: string;
  };
  who_should_avoid: string[];
  storage: string[];
  price: {
    unit_price: number;
    strip_price: number;
    currency: string;
    updated_date: string;
  };
  image: string;
  alternatives: string[];
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  about: string;
  total_medicines: number;
  categories: string[];
  popular_products: string[];
  founded: string;
  headquarters: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  read_time: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  favorites: string[];
  created_at: string;
}

export interface SearchResult {
  medicines: Medicine[];
  total: number;
  query: string;
}
