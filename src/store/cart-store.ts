'use client'

import { create } from 'zustand'

interface Store {
    productCount: number, 
    addProduct: () => void, 
    removeProduct: () => void, 
 }

export const useCart = create<Store>((set) => ({
    productCount: 0, 
    addProduct: () => set((state)=> ({productCount: state.productCount + 1})), 
    removeProduct: () => set((state)=>({productCount: state.productCount - 1}))
}))