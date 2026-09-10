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
    addProduct: (productInfo: ProductInfo) => void, 
    removeProduct: (id: string) => void, 
}

export const useCart = create<Store>((set) => ({
    items: [],
    productCount: 0,

    isDrawerOpen: false, 
    setDrawerOpen: (isOpen) => set(() => ({isDrawerOpen: isOpen})), 

    addProduct: (productInfo) => set((state)=> {
        const oldItems = state.items.filter((oldItem) => oldItem.id !== productInfo.id )
        const existingItem = state.items.find((oldItem) => oldItem.id === productInfo.id)

        return ({ 
        items: [
            ...oldItems, 
            existingItem // if item already exists
            ? {...existingItem, itemCount: existingItem.itemCount + 1} 
            : {...productInfo, itemCount: 1}
        ], 
        isDrawerOpen: true, 
        productCount: state.items.length + 1
    })}), 
    
    removeProduct: (id) => set((state)=>({
        items: state.items.filter((item) => item.id === id), 
        productCount: state.productCount - 1
    }))
}))