"use client";

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from "react";
import type { MenuItem, OrderItem, OrderContextType } from "@/types";

const OrderContext = createContext<OrderContextType | null>(null);

type Action =
  | { type: "ADD_ITEM"; item: MenuItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function reducer(state: OrderItem[], action: Action): OrderItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.id !== action.id);
    case "UPDATE_QTY":
      if (action.qty <= 0) return state.filter((i) => i.id !== action.id);
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: action.qty } : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);

  const value = useMemo<OrderContextType>(
    () => ({
      items,
      addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
      updateQty: (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: items.reduce((sum, i) => sum + i.qty, 0),
    }),
    [items]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder(): OrderContextType {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
