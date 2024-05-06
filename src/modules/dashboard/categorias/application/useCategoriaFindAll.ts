import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { CategoriaResponse } from "../domain";
import { CATEGORIA_FIND_ALL } from "./QueryKeys";
import { CategoriaRepository } from "../infraestructure";

const useCategoriaFindAll = (): UseQueryResult<CategoriaResponse[], Error> => {
  const response = useQuery({
    queryKey: [CATEGORIA_FIND_ALL],
    queryFn: async () => await CategoriaRepository.findAll(),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return response;
};

export default useCategoriaFindAll;
