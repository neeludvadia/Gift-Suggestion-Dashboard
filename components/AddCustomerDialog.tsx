'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCustomerStore } from '@/store/customerStore'
import { toast } from 'react-toastify'

const AddCustomerDialog = () => {
  const { addCustomer, customers } = useCustomerStore()
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    name: '',
    company: '',
    occasion: '',
    budget: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.company || !form.occasion || !form.budget) {
      alert('Please fill all fields!')
      return
    }

    const newCustomer = {
      id: customers.length + 1,
      name: form.name,
      company: form.company,
      occasion: form.occasion,
      budget: parseFloat(form.budget),
    }

    addCustomer(newCustomer)
    setForm({ name: '', company: '', occasion: '', budget: '' })
    setOpen(false)
    toast.success(`Customer "${form.name}" added successfully! 🎉`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
  variant="default"
  size="lg"
  className="hover:cursor-pointer md:font-semibold md:text-base md:px-5 md:py-2 text-black bg-white border"
>
  + Add Customer
</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter name"
              value={form?.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Enter company name"
              value={form?.company}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Input
              id="occasion"
              name="occasion"
              placeholder="Birthday / Anniversary"
              value={form?.occasion}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              name="budget"
              type="number"
              placeholder="Enter budget"
              value={form?.budget}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Add Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCustomerDialog
