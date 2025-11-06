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
import { Pencil } from 'lucide-react'
import { Customer } from '@/types/Customer'

interface Props {
  customer: Customer
}

const EditCustomerDialog = ({ customer }: Props) => {
  const { updateCustomer } = useCustomerStore()
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    name: customer.name,
    company: customer.company,
    occasion: customer.occasion,
    budget: customer.budget.toString(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.company || !form.occasion || !form.budget) {
      toast.error('Please fill all fields!')
      return
    }

    updateCustomer(customer.id, {
      name: form.name,
      company: form.company,
      occasion: form.occasion,
      budget: parseFloat(form.budget),
    })

    setOpen(false)
    toast.success(`Customer "${form.name}" updated successfully!`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='hover:cursor-pointer' variant="outline" size="sm">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" value={form.company} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Input id="occasion" name="occasion" value={form.occasion} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="budget">Budget</Label>
            <Input id="budget" name="budget" type="number" value={form.budget} onChange={handleChange} />
          </div>

          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCustomerDialog
