/**
 * 📁 lib/context/CartContext.tsx
 * 📁 Context provider for managing the shopping cart state.
 * ⚙️ Utilizes useReducer for robust cart state mutations (add, remove, update quantity, clear, toggle open).
 * 🔗 Imports React core context utilities and reducer hooks.
 */

"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

/**
 * 📦 CartItem
 * 📦 Represents a simplified product object in the shopping cart.
 */
export interface CartItem {
  /** Unique identifier of the product */
  id: string;
  /** Display name of the jewelry item */
  name: string;
  /** Base price in cents (e.g. 245000 for $2,450.00) */
  price: number;
  /** Primary image URL representing the product thumbnail */
  image: string;
  /** Quantity of this item added to the cart */
  quantity: number;
}

/**
 * 📦 CartState
 * 📦 Internal state layout of the shopping cart context.
 */
interface CartState {
  /** Array containing current items inside the shopping cart */
  items: CartItem[];
  /** Control flag indicating if the slide-over cart drawer is visible */
  isCartOpen: boolean;
}

/**
 * 📦 CartAction
 * 📦 Action union type defining all possible state mutations in the cart reducer.
 */
type CartAction =
  /** ⚙️ Action to add an item to the cart or increment its count */
  | { type: "ADD_TO_CART"; payload: Omit<CartItem, "quantity"> }
  /** ⚙️ Action to remove an item from the cart using its ID */
  | { type: "REMOVE_FROM_CART"; payload: { id: string } }
  /** ⚙️ Action to modify an item's quantity count to a specific value */
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  /** ⚙️ Action to wipe the items list clean */
  | { type: "CLEAR_CART" }
  /** ⚙️ Action to explicitly open or close the cart drawer layout */
  | { type: "TOGGLE_CART"; payload: boolean };

/**
 * 📦 CartContextType
 * 📦 Public context API interface exposed to consuming child components.
 */
interface CartContextType {
  /** Current list of cart items */
  items: CartItem[];
  /** Total price in cents of all items in the cart */
  totalPrice: number;
  /** Visible status of the cart drawer */
  isCartOpen: boolean;
  /** Adds a product to the cart (quantity will start at 1 or increment) */
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  /** Removes a product from the cart by its ID */
  removeFromCart: (id: string) => void;
  /** Sets a new quantity count for a product */
  updateQuantity: (id: string, quantity: number) => void;
  /** Empties all contents of the cart */
  clearCart: () => void;
  /** Sets the open/close state of the cart drawer */
  setCartOpen: (open: boolean) => void;
}

// Initial state for the reducer
const initialCartState: CartState = {
  items: [],
  isCartOpen: false,
};

/**
 * 🎯 cartReducer
 * 🎯 Pure function mapping dispatch actions to new cart states.
 *
 * @param state - The active CartState layout
 * @param action - Triggered CartAction with payload details
 * @returns The newly computed CartState
 */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      // 🎨 Check if item is already present in the items array
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // 🎨 If item exists, make a copy and increment its quantity count by 1
        const updatedItems = state.items.map((item, idx) => {
          if (idx === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        return {
          ...state,
          items: updatedItems,
        };
      }

      // 🎨 If item is new, append it to the end of the items list with quantity set to 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      // 🎨 Filter out the item matching the payload ID to discard it from the list
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case "UPDATE_QUANTITY": {
      // 🎨 Map over items and modify the quantity of the item matching the target ID
      // 🎨 Enforce a minimum quantity of 1 to keep state consistent and clean
      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          const clampedQuantity = Math.max(1, action.payload.quantity);
          return { ...item, quantity: clampedQuantity };
        }
        return item;
      });

      return {
        ...state,
        items: updatedItems,
      };
    }

    case "CLEAR_CART": {
      // 🎨 Reset the items array back to an empty collection
      return {
        ...state,
        items: [],
      };
    }

    case "TOGGLE_CART": {
      // 🎨 Set the drawer display boolean to match the requested payload visibility
      return {
        ...state,
        isCartOpen: action.payload,
      };
    }

    default:
      return state;
  }
}

// Create the context container with default undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * 🎯 CartProvider
 * 🎯 React wrapper component providing cart state capabilities to children nodes.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // ⚙️ Compute total price dynamically in cents by sum of (price * quantity)
  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ⚙️ Action dispatcher: Add product to cart
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  // ⚙️ Action dispatcher: Remove product from cart
  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  // ⚙️ Action dispatcher: Update product count
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  // ⚙️ Action dispatcher: Empty entire cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // ⚙️ Action dispatcher: Toggle side drawer panel
  const setCartOpen = (open: boolean) => {
    dispatch({ type: "TOGGLE_CART", payload: open });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalPrice,
        isCartOpen: state.isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * 🎯 useCart
 * 🎯 Hook interface to consume context actions and items easily in client components.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be executed within a CartProvider wrapper");
  }
  return context;
}
