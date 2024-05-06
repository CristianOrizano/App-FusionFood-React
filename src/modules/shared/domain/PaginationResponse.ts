export default interface PaginationResponse<T> {
  from: number;
  to: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  total: number;
  data: T[];
}
