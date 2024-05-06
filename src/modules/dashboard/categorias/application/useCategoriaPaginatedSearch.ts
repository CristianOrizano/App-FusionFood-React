import { PaginationRequest, PaginationResponse } from "@/modules/shared/domain";
import { CategoriaFilter, CategoriaResponse } from "../domain";
import { DefinedUseQueryResult, useQuery } from "@tanstack/react-query";
import { CATEGORIA_PAGINATED_SEARCH } from "./QueryKeys";
import { CategoriaRepository } from "../infraestructure";

const useCategoriaPaginatedSearch = (
  paginationRequest: PaginationRequest<CategoriaFilter>,
): DefinedUseQueryResult<PaginationResponse<CategoriaResponse>, Error> => {
  const response = useQuery({
    queryKey: [CATEGORIA_PAGINATED_SEARCH, paginationRequest],
    queryFn: async () =>
      await CategoriaRepository.paginatedSearch(paginationRequest),
    retry: 0,
    refetchOnWindowFocus: false,
    initialData: {
      from: 0,
      to: 0,
      perPage: 0,
      currentPage: 0,
      lastPage: 0,
      total: 0,
      data: [],
    },
  });

  return response;
};

export default useCategoriaPaginatedSearch;
