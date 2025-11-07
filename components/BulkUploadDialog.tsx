'use client'

import React, { useState } from 'react'
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
  const addMultipleCustomers = useCustomerStore((s) => s.addMultipleCustomers)

  const [jsonData, setJsonData] = useState<any[]>([])
  const [detectedColumns, setDetectedColumns] = useState<string[]>([])
  const [mapping, setMapping] = useState<Record<string, string>>({
    Name: '',
    Company: '',
    Occasion: '',
    Budget: '',
  })
  const [showMapper, setShowMapper] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Allowed extensions and MIME types
  const allowedExtensions = ['xlsx', 'csv'];
  const extension = file.name.split('.').pop()?.toLowerCase();

  const validMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'text/csv', // .csv
    'application/vnd.ms-excel', // sometimes used by csv
  ];

  // Validate file type
  if (!allowedExtensions.includes(extension!) || !validMimeTypes.includes(file.type)) {
    toast.error('Only .xlsx or .csv files are allowed!');
    e.target.value = ''; // reset file input
    return;
  }

    try {
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer)
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(sheet)

      if (!data.length) {
        toast.error('The uploaded file is empty.')
        return
      }

      const firstRow = Object.keys(data[0] as any)
      setDetectedColumns(firstRow)
      setJsonData(data)
      setShowMapper(true)

      toast.info('File uploaded. Please map columns before importing.')
    } catch (err) {
      console.error(err)
      toast.error('Invalid or corrupted Excel file.')
    }
  }

  const handleConfirmImport = () => {
    // Check mapping completeness
    const missing = Object.entries(mapping)
      .filter(([_, val]) => !val)
      .map(([key]) => key)
    if (missing.length) {
      toast.error(`Please map all fields: ${missing.join(', ')}`)
      return
    }

    // Map rows based on mapping
    const formatted = jsonData.map((row, index) => ({
      id: Date.now() + index,
      name: row[mapping.Name]?.trim() || '',
      company: row[mapping.Company]?.trim() || '',
      occasion: row[mapping.Occasion]?.trim() || '',
      budget: Number(row[mapping.Budget]) || 0,
    }))

    const validationError = validateExcelData(
      formatted.map((r) => ({
        Name: r.name,
        Company: r.company,
        Occasion: r.occasion,
        Budget: r.budget,
      }))
    )
    if (validationError) {
      toast.error(`❌ ${validationError}`)
      return
    }

    addMultipleCustomers(formatted)
    toast.success(`✅ Imported ${formatted.length} employees successfully!`)
    setShowMapper(false)
    setJsonData([])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <span className='md:flex hidden' >📤</span> Upload Excel/CSV
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bulk Upload Employees</DialogTitle>
        </DialogHeader>

        {/* Upload Input */}
        {!showMapper && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-600">
              Upload a file with columns like:
              <br />
              <strong>Name, Company, Occasion, Budget</strong>
            </p>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
              className="w-full border rounded-md p-2 text-sm"
            />
          </div>
        )}

        {/* Column Mapper */}
        {showMapper && (
          <div className="mt-4">
            <h3 className="font-medium text-sm mb-2">🧩 Column Mapping</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(mapping).map((appField) => (
                <div key={appField} className="flex flex-col text-sm">
                  <label className="font-semibold mb-1">{appField}</label>
                  <select
                    className="border rounded-md p-1"
                    value={mapping[appField]}
                    onChange={(e) =>
                      setMapping({ ...mapping, [appField]: e.target.value })
                    }
                  >
                    <option value="">-- Select Column --</option>
                    {detectedColumns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2">👁️ Preview (first 5 rows)</h4>
              <div className="overflow-x-auto border rounded-lg text-sm">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      {detectedColumns.map((col) => (
                        <th key={col} className="border p-2 text-left">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jsonData.slice(0, 5).map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        {detectedColumns.map((col) => (
                          <td key={col} className="border p-2">
                            {String(row[col] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowMapper(false)
                  setJsonData([])
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleConfirmImport}>Confirm Import</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BulkUploadDialog
