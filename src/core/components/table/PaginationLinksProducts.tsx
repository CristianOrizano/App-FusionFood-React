import { FilterPage, PaginationResponse } from '@/modules/shared/domain';
import { useEffect, useState } from 'react';
import { FormSelect, Pagination } from 'react-bootstrap';
import PaginationItems from './PaginationItems';

interface PaginationLinksProps<T> {
	data: PaginationResponse<T>;
	goToPage: (payload: FilterPage) => void;
}

const PaginationLinksProducts = <T,>({ data, goToPage }: PaginationLinksProps<T>): JSX.Element => {
	const perPageItems: number[] = [5, 10, 20, 30, 40, 50, 100];
	const paginationItemsLimit: number = 5;

	const [pageSize, setPageSize] = useState<number>(0);
	const [pageOptions, setPageOptions] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);

	const [paginationItems, setPaginationItems] = useState<number[]>([]);
	const [isPosibleShowAll, setIsPosibleShowAll] = useState<boolean>(true);
	const [separatorAtEnd, setSeparatorAtEnd] = useState<boolean>(false);
	const [separatorAtAround, setSeparatorAtAround] = useState<boolean>(false);

	// Hooks
	useEffect(() => {
		setPaginationItems(Array.from({ length: paginationItemsLimit }, (_, i) => i));
	}, []);

	useEffect(() => {
		if (data != null) {
			setCurrentPage(data.currentPage);
			setPageSize(data.perPage);
			setPageOptions(Array.from({ length: data.lastPage }, (_, i) => i));

			// setSeparatorAtEnd
			setSeparatorAtEnd(data.currentPage < paginationItemsLimit);

			// setSeparatorAtAround
			const showSeparatorAtAround =
				data.currentPage >= paginationItemsLimit &&
				data.lastPage > paginationItemsLimit &&
				data.lastPage > data.currentPage + 1;

			setSeparatorAtAround(showSeparatorAtAround);
		}
	}, [data]);

	useEffect(() => {
		if (data?.lastPage != null) setIsPosibleShowAll(data?.lastPage <= paginationItemsLimit);
	}, [data?.lastPage]);

	return (
		<div className="d-flex justify-content-end align-items-center flex-wrap">
			<Pagination className="mb-0">
				<Pagination.First
					disabled={data?.currentPage === 1}
					onClick={() => {
						goToPage({
							page: 1,
							perPage: data?.perPage ?? 10,
						});
					}}
				/>
				<Pagination.Prev
					disabled={data?.currentPage === 1}
					onClick={() => {
						goToPage({
							page: (data?.currentPage ?? 0) - 1,
							perPage: data?.perPage ?? 10,
						});
					}}
				/>

				<PaginationItems
					data={data}
					goToPage={goToPage}
					paginationItemsLimit={paginationItemsLimit}
					paginationItems={paginationItems}
					pageOptions={pageOptions}
					pageSize={pageSize}
					currentPage={currentPage}
					isPosibleShowAll={isPosibleShowAll}
					separatorAtEnd={separatorAtEnd}
					separatorAtAround={separatorAtAround}
				/>

				<Pagination.Next
					disabled={data?.currentPage === data?.lastPage}
					onClick={() => {
						goToPage({
							page: (data?.currentPage ?? 0) + 1,
							perPage: data?.perPage ?? 10,
						});
					}}
				/>
				<Pagination.Last
					disabled={data?.currentPage === data?.lastPage}
					onClick={() => {
						goToPage({
							page: data?.lastPage ?? 0,
							perPage: data?.perPage ?? 10,
						});
					}}
				/>
			</Pagination>
		</div>
	);
};

export default PaginationLinksProducts;
