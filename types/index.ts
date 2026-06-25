export interface MenuItem {
  id: string;
  name: string;
  price: number;
  desc?: string;
  emoji: string;
  spicy?: boolean;
  veg?: boolean;
  popular?: boolean;
}

export interface MenuSectionProps {
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface OrderItem extends MenuItem {
  qty: number;
}

export interface OrderContextType {
  items: OrderItem[];
  addItem: (item: Omit<OrderItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}
