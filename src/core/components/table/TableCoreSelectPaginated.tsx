import { FilterPage, PaginationResponse } from '@/modules/shared/domain';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table } from 'react-bootstrap';
import PaginationLinks from './PaginationLinks';

interface TableCoreSelectPaginatedProps<T> {
	columns: Array<ColumnDef<T, any>>;
	data: PaginationResponse<T>;
	goToPage: (payload: FilterPage) => void;
}

const TableCoreSelectPaginated = <T,>({
	columns,
	data,
	goToPage,
}: TableCoreSelectPaginatedProps<T>): JSX.Element => {
	// const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useReactTable<T>({
		columns: columns,
		data: data?.data ?? [],

		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<Table responsive bordered hover size="sm">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className="bg-secondary text-white">
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
			{data?.data?.length > 0 && <PaginationLinks data={data} goToPage={goToPage} />}
		</>
	);
};

export default TableCoreSelectPaginated;
