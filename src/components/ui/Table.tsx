import { cn } from '@/utils/cn'

interface TableColumn {
  key: string
  label: string
  className?: string
}

interface TableProps {
  columns: TableColumn[]
  data: any[]
  className?: string
}

const Table = ({ columns, data, className }: TableProps) => {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-sm font-medium text-gray-900',
                  column.className
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-sm text-gray-900',
                    column.className
                  )}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
