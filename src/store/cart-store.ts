'use client'

import { create } from 'zustand'

export const useCart = create((set) => ({
    productCount: 0, 
    addProduct: () => set((state)=> ({productCount: state.productCount + 1})), 
    removeProduct: () => set((state)=>({productCount: state.productCount - 1}))
}))