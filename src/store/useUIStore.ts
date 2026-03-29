import { create } from "zustand"

export const useUIStore = create((set) => ({
  collapsed: false,
  toggle: () => set((state) => ({ collapsed: !state.collapsed }))
}))
