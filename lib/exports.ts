import Papa from 'papaparse'

export interface ExportColumn {
  key: string
  header: string
  format?: (value: any) => string
}

/**
 * Generate CSV string from data
 */
export function generateCSV(data: any[], columns: ExportColumn[]): string {
  const headers = columns.map(c => c.header)
  const rows = data.map(item =>
    columns.map(col => {
      const value = item[col.key]
      if (col.format) {
        return col.format(value)
      }
      if (value === null || value === undefined) {
        return ''
      }
      if (typeof value === 'object') {
        return JSON.stringify(value)
      }
      return String(value)
    })
  )

  return Papa.unparse({
    fields: headers,
    data: rows
  })
}

/**
 * Download CSV file
 */
export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export data to CSV and trigger download
 */
export function exportToCSV(
  data: any[],
  columns: ExportColumn[],
  filename: string
): void {
  const csv = generateCSV(data, columns)
  downloadCSV(csv, filename)
}

// Standard column definitions for common exports
export const userColumns: ExportColumn[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'createdAt', header: 'Created', format: (v) => v ? new Date(v).toISOString() : '' },
  { key: 'status', header: 'Status' },
]

export const productColumns: ExportColumn[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'price', header: 'Price', format: (v) => v ? `$${v.toFixed(2)}` : '' },
  { key: 'category', header: 'Category' },
  { key: 'approvalStatus', header: 'Status' },
  { key: 'createdAt', header: 'Created', format: (v) => v ? new Date(v).toISOString() : '' },
  { key: 'seller', header: 'Seller', format: (v) => v?.name || v?.email || '' },
]

export const articleColumns: ExportColumn[] = [
  { key: 'id', header: 'ID' },
  { key: 'title', header: 'Title' },
  { key: 'published', header: 'Published', format: (v) => v ? 'Yes' : 'No' },
  { key: 'views', header: 'Views' },
  { key: 'createdAt', header: 'Created', format: (v) => v ? new Date(v).toISOString() : '' },
  { key: 'author', header: 'Author', format: (v) => v?.name || v?.email || '' },
]

export const auditLogColumns: ExportColumn[] = [
  { key: 'createdAt', header: 'Date', format: (v) => v ? new Date(v).toISOString() : '' },
  { key: 'user', header: 'Admin', format: (v) => v?.name || v?.email || '' },
  { key: 'action', header: 'Action' },
  { key: 'description', header: 'Description' },
  { key: 'metadata', header: 'Metadata', format: (v) => v ? JSON.stringify(v) : '' },
]

export const reportColumns: ExportColumn[] = [
  { key: 'id', header: 'ID' },
  { key: 'contentType', header: 'Content Type' },
  { key: 'contentId', header: 'Content ID' },
  { key: 'reason', header: 'Reason' },
  { key: 'status', header: 'Status' },
  { key: 'priority', header: 'Priority' },
  { key: 'createdAt', header: 'Created', format: (v) => v ? new Date(v).toISOString() : '' },
  { key: 'reporter', header: 'Reporter', format: (v) => v?.name || v?.email || '' },
  { key: 'resolvedAt', header: 'Resolved', format: (v) => v ? new Date(v).toISOString() : '' },
]
