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

export type ProductInfo = Omit<Item, "itemCount">

interface Store {
    items: Item [],
    productCount: number,
    isDrawerOpen: boolean, 
    setDrawerOpen: (isOpen: boolean) => void, 
    addNewItem: (productInfo: ProductInfo) => void, 
    removeItem: (id: string) => void, 
    increaseQuantity: (id: string) => void, 
    decreaseQuantity: (id: string) => void, 
}

export const useCart = create<Store>((set) => ({
    items: [],
    productCount: 0,

    isDrawerOpen: false, 
    setDrawerOpen: (isOpen) => set(() => ({isDrawerOpen: isOpen})), 

    addNewItem: (productInfo) => set((state)=> {
        return ({ 
        items: [...state.items, {...productInfo, itemCount: 1}], 
        productCount: state.productCount + 1, 
        isDrawerOpen: true, 
    })}), 
    
    removeItem: (id) => set((state) => (
        {
            items: state.items.filter((item) => item.id === id), 
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
                ? {...item, itemCount: item.itemCount - 1}
                : item
            )),
            productCount: state.productCount - 1
        }
    ))
}))