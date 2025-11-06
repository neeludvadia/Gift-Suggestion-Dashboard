import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Customer } from '@/types/Customer'

interface CustomerState {
  customers: Customer[]
  addCustomer: (customer: Customer) => void
  updateGift: (id: number, gift: Customer['gift']) => void
  removeCustomer: (id: number) => void
  updateCustomer: (id: number, updatedData: Partial<Customer>) => void
  addMultipleCustomers:(Customer:Customer[])=>void
  deleteMultipleCustomers:(ids:number[])=>void
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customers: [
        {
          id: 1,
          name: 'Neel Udvadia',
          company: 'DelightLoop',
          occasion: 'Birthday',
          budget: 120,
        },
        {
          id: 2,
          name: 'Riya Mehta',
          company: 'Techverse',
          occasion: 'Thank You',
          budget: 80,
        },
        {
          id: 3,
          name: 'Aarav Patel',
          company: 'NextGen Solutions',
          occasion: 'Renewal',
          budget: 150,
        },
      ],

      addCustomer: (customer) =>
        set((state) => ({
          customers: [...state.customers, customer],
        })),

      updateGift: (id, gift) =>
        set((state) => ({
          customers: state.customers.map((item) =>
            item.id === id ? { ...item, gift } : item
          ),
        })),
         removeCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((item) => item.id !== id),
        })),
        updateCustomer: (id, updatedData) =>
        set((state) => ({
          customers: state.customers.map((item) =>
            item.id === id ? { ...item, ...updatedData } : item
          ),
        })),
        addMultipleCustomers: (customers: Customer[]) =>
          set((state) => ({
          customers: [...state.customers, ...customers],
          })),
          deleteMultipleCustomers: (ids: number[]) =>
            set((state) => ({
            customers: state.customers.filter((item) => !ids.includes(item.id)),
          })),
    }),
    {
      name: 'customer-storage', // key for localStorage persistence
    }
  )
)
