import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CategoriaRequest, CategoriaResponse } from "../domain";
import { CategoriaRepository } from "../infraestructure";
import { CATEGORIA_PAGINATED_SEARCH } from "./QueryKeys";

interface CategoriaUpdateProps {
  id: number;
  categoria: CategoriaRequest;
}

const useCategoriaUpdate = (): UseMutationResult<
  CategoriaResponse,
  Error,
  CategoriaUpdateProps
> => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: async (payload: CategoriaUpdateProps) =>
      await CategoriaRepository.update(payload.id, payload.categoria),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [CATEGORIA_PAGINATED_SEARCH],
      });
    },
  });

  return response;
};

export default useCategoriaUpdate;
