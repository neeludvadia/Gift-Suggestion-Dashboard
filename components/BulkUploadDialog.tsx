'use client'

import React, { useRef } from 'react'
import * as XLSX from 'xlsx'
import { toast } from 'react-toastify'
import { useCustomerStore } from '@/store/customerStore'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { validateExcelData } from '@/lib/validateExcel'

const BulkUploadDialog = () => {
  const {addMultipleCustomers} = useCustomerStore();

  const uploadButtonRef = useRef<HTMLButtonElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer)
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(sheet)

      if (!jsonData.length) {
        toast.error('No data found in Excel file!')
        return
      }

      // Validate file content
      const validationError = validateExcelData(jsonData as any[])
      if (validationError) {
        toast.error(`❌ ${validationError}`)
        return
      }

      // Convert rows to Customer objects
      const formatted = jsonData.map((row: any, index: number) => ({
        id: Date.now() + index,
        name: row.Name || '',
        company: row.Company || '',
        occasion: row.Occasion || '',
        budget: Number(row.Budget) || 0,
      }))

      addMultipleCustomers(formatted)
      toast.success(`${formatted.length} employees uploaded successfully!`)
     // use ref to trigger click 
      if (uploadButtonRef.current) {
        uploadButtonRef.current.click()
      }
    } catch (error) {
      console.error(error)
      toast.error('Invalid Excel file format.')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={uploadButtonRef} variant="outline" className="border-dashed hover:cursor-pointer">
          📤 Upload Excel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Upload Employees</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          <p className="text-sm text-gray-600">
            Please upload an Excel file with the following columns:
            <br />
            <strong>Name, Company, Occasion, Budget</strong>
          </p>

          <input
          ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BulkUploadDialog
