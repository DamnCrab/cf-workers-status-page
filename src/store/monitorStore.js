import { create } from 'zustand'
import config from '../../config.yaml'

export const useMonitorStore = create((set) => ({
  monitors: config.monitors,
  visible: config.monitors,
  activeFilter: false,
  
  filterByTerm: (term) => set((state) => ({
    visible: state.monitors.filter((monitor) =>
      monitor.name.toLowerCase().includes(term.toLowerCase())
    ),
  })),
  
  setActiveFilter: (active) => set({ activeFilter: active }),
  
  resetFilter: () => set((state) => ({
    visible: state.monitors,
    activeFilter: false,
  })),
}))