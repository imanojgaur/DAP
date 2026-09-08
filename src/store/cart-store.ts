'use client'

import { create } from 'zustand'

export interface item {
    id: string,
    title: string, 
    price: number,
    comparPriceAt: number, 
    href: string, 
    imgSrc?: string, 
}

interface Store {
    items: item [],
    productCount: number,
    isDrawerOpen: boolean, 
    setDrawerOpen: (isOpen: boolean) => void, 
    addProduct: (item: item) => void, 
    removeProduct: (id: string) => void, 
}

export const useCart = create<Store>((set) => ({
    items: [],
    productCount: 0,

    isDrawerOpen: false, 
    setDrawerOpen: (isOpen) => set(() => ({isDrawerOpen: isOpen})), 

    addProduct: (item) => set((state)=> ({
        items: [...state.items, item], 
        isDrawerOpen: true, 
        productCount: state.items.length + 1
    })), 
    
    removeProduct: (id) => set((state)=>({
        items: state.items.filter((item) => item.id === id), 
        productCount: state.productCount - 1
    }))
}))