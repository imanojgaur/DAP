'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Item {
    id: string,
    title: string, 
    price: number,
    comparPriceAt: number, 
    href: string, 
    imgSrc?: string, 
    itemCount: number, 
}

export type ReceivedItemInfo = Omit<Item, "itemCount">

interface StoreState {
    items: Item [],
    productCount: number,
    isDrawerOpen: boolean, 
    lastAddedItem: string, 
}

interface StoreActions {
    setDrawerOpen: (isOpen: boolean) => void, 
    addNewItem: (receivedItem: ReceivedItemInfo) => void, 
    removeItem: (id: string) => void, 
    increaseQuantity: (id: string) => void, 
    decreaseQuantity: (id: string) => void, 
}

type CartStore = StoreState & StoreActions

export const useCart = create<CartStore>()(
    persist((set) => ({
        items: [],
        productCount: 0,

        isDrawerOpen: false, 
        setDrawerOpen: (isOpen) => set(() => ({isDrawerOpen: isOpen})), 

        lastAddedItem: "", 

        addNewItem: (receivedItem) => set((state)=> {
            const existingItem = state.items.find((item) => item.id === receivedItem.id)
            const oldItems = state.items.filter((item) => receivedItem.id !== item.id )
            
            return ({ 
            items: existingItem
                ? [{
                    ...existingItem, 
                    itemCount: existingItem.itemCount + 1
                    }, 
                    ...oldItems, 
                ] : [{
                        ...receivedItem, 
                        itemCount: 1
                    }, 
                    ...oldItems
                ], 
            productCount: state.productCount + 1, 
            isDrawerOpen: true, 
            lastAddedItem: receivedItem.id
        })}), 
        
        removeItem: (id) => set((state) => {
            const removeItemCount = (state.items.find((item) => item.id === id)?.itemCount) 
            if (!removeItemCount) return state; //Guard: user mobile lag clicking trash aggressively causing app break 
            return (
            {
                items: state.items.filter((item) => item.id !== id), 
                productCount: state.productCount - removeItemCount
            })}), 

        increaseQuantity: (id) => set((state) => (
            { 
                items: state.items.map((item) => (
                    item.id === id
                        ? {...item, itemCount: item.itemCount + 1}
                        : item
                )), 
                productCount: state.productCount + 1
            }
        )),

        decreaseQuantity: (id) => set((state) => {
            const targetItem = state.items.find((item) => item.id === id)
            if(!targetItem || targetItem.itemCount === 1) return state; 

            return (
            {
                items: state.items.map((item) => (
                    item.id === id
                    ? {...item, itemCount: item.itemCount - 1}
                    : item
                )),
                productCount:  state.productCount - 1,
            })}
        )
    }),
    {
        name: "cart-store", 
        partialize: (state) => ({
            items: state.items, 
            productCount: state.productCount, 
        }), 
    }
))