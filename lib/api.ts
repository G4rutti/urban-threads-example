export interface Product {
  id: string;
  name_en: string;
  name_pt: string;
  price: number;
  category_en: string;
  category_pt: string;
  image: string;
  image_alt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutData {
  name: string;
  email: string;
  address: string;
  paymentMethod: string;
}

export async function getProducts(): Promise<Product[]> {
  // TODO: Integrate with Firebase to fetch products
  const response = await fetch("/api/products");
  return response.json();
}

export async function addToCart(productId: string): Promise<void> {
  // TODO: Integrate with Firebase to add product to cart
  console.log("Adding to cart:", productId);
}

export async function removeFromCart(productId: string): Promise<void> {
  // TODO: Integrate with Firebase to remove product from cart
  console.log("Removing from cart:", productId);
}

export async function checkout(data: CheckoutData): Promise<void> {
  // TODO: Integrate with Firebase to process checkout
  console.log("Processing checkout:", data);
}
