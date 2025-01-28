export function getCurrentYear() {
  return new Date().getFullYear();
}

export function formatPrice(price: number): string {
  return price.toFixed(2);
}

export function calculateTotalPrice(price: number, quantity: number): number {
  return price * quantity;
}
