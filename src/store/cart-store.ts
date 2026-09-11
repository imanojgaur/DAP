'use client'

import { create } from 'zustand'

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

interface Store {
    items: Item [],
    productCount: number,
    isDrawerOpen: boolean, 
    setDrawerOpen: (isOpen: boolean) => void, 
    addNewItem: (receivedItem: ReceivedItemInfo) => void, 
    removeItem: (id: string) => void, 
    increaseQuantity: (id: string) => void, 
    decreaseQuantity: (id: string) => void, 
}

export const useCart = create<Store>((set) => ({
    items: [],
    productCount: 0,

    isDrawerOpen: false, 
    setDrawerOpen: (isOpen) => set(() => ({isDrawerOpen: isOpen})), 

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
    })}), 
    
    removeItem: (id) => set((state) => (
        {
            items: state.items.filter((item) => item.id !== id), 
            productCount: state.productCount - 1
        }
    )), 

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

    decreaseQuantity: (id) => set((state) => (
        {
            items: state.items.map((item) => (
                item.id === id
                ? {
                    ...item, 
                    itemCount: item.itemCount > 1
                        ? item.itemCount - 1
                        : item.itemCount
                }
                : item
            )),
            productCount: (state.productCount > 1)
                ? state.productCount - 1
                : state.productCount
        })
    )
}))