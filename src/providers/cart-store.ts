// src/providers/cart-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
	id: string;
	name: string;
	price: number;
	slug: string;
	image: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	lastAddedItem: CartItem | null; // Tracks the item for the popup
	showNotification: boolean; // Tracks if the popup is open
	addItem: (item: Omit<CartItem, "quantity">) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
	closeNotification: () => void; // Allows manual/auto closing
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			items: [],
			lastAddedItem: null,
			showNotification: false,

			addItem: (newItem) =>
				set((state) => {
					const existingItem = state.items.find(
						(item) => item.id === newItem.id,
					);

					let newItems: any;
					if (existingItem) {
						newItems = state.items.map((item) =>
							item.id === newItem.id
								? { ...item, quantity: item.quantity + 1 }
								: item,
						);
					} else {
						newItems = [...state.items, { ...newItem, quantity: 1 }];
					}

					// Return updated items AND trigger the notification!
					return {
						items: newItems,
						lastAddedItem: { ...newItem, quantity: 1 },
						showNotification: true,
					};
				}),

			removeItem: (id) =>
				set((state) => ({
					items: state.items.filter((item) => item.id !== id),
				})),

			updateQuantity: (id, quantity) =>
				set((state) => ({
					items: state.items.map((item) =>
						item.id === id
							? { ...item, quantity: Math.max(1, quantity) }
							: item,
					),
				})),

			clearCart: () => set({ items: [] }),

			closeNotification: () => set({ showNotification: false }),
		}),
		{
			name: "plant-cart-storage",
			// We don't want to persist the notification state on page refresh
			partialize: (state) => ({ items: state.items }),
		},
	),
);
