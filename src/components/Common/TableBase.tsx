import React from 'react'

interface TableBaseProps {
    tableData: any[];
    children: React.ReactNode;
    tableColumns: string[];
}
const TableBase: React.FC<TableBaseProps> = ({ tableData, tableColumns, children }) => {
    return (
        <div className="mt-12 border overflow-x-scroll rounded-md">
            {tableData.length > 0 ?
                <table className="w-full table-auto text-sm text-left border">
                    <thead className="bg-gray-50 text-gray-700 font-bold border-b text-base">
                        <tr>
                            {tableColumns.map((col) => (
                                <th scope="col" className="px-6 py-3" key={col}>
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {children}
                    </tbody>
                </table>
                : (<div>
                    <p className='py-5 text-center'>No data found</p>
                </div>
                )}
        </div>
    )
}

export default TableBase