interface ExcelRow {
  Name?: string
  Company?: string
  Occasion?: string
  Budget?: number | string
}

export function validateExcelData(rows: ExcelRow[]): string | null {
  if (!rows || rows.length === 0) {
    return 'The file appears to be empty.'
  }

  // ✅ Required column check
  const requiredColumns = ['Name', 'Company', 'Occasion', 'Budget']
  const firstRowKeys = Object.keys(rows[0])

  const missingColumns = requiredColumns.filter(
    (col) => !firstRowKeys.includes(col)
  )
  if (missingColumns.length > 0) {
    return `Missing required columns: ${missingColumns.join(', ')}`
  }

  // ✅ Row content validation
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]

    if (!row.Name || !row.Company || !row.Occasion || row.Budget == null) {
      return `Row ${i + 2}: Missing one or more required fields.`
    }

    if (isNaN(Number(row.Budget))) {
      return `Row ${i + 2}: Budget must be a number.`
    }
  }

  // Duplicate check by name
  // const names = rows.map((item) => item.Name?.toLowerCase().trim())
  // const duplicates = names.filter(
  //   (name, index) => name && names.indexOf(name) !== index
  // )
  // if (duplicates.length > 0) {
  //   return `Duplicate entries found for: ${[...new Set(duplicates)].join(', ')}`
  // }

  return null // ✅ No errors
}
