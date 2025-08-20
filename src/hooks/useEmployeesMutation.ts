import {type MutationFunction, useMutation, type UseMutationResult, useQueryClient} from "@tanstack/react-query";
import type {Employee} from "../model/dto-types.ts";

export default function useEmployeesMutation<T>(
    mutationFunction: MutationFunction<Employee, T>,
): UseMutationResult<Employee, Error, T>{
    const queryClient = useQueryClient();
    const mutationResult = useMutation<Employee, Error, T>({
            mutationFn: mutationFunction,
            onSuccess: async () => {
                await queryClient.invalidateQueries({queryKey: ["/employees"]});
            },
        },
        queryClient
    );
    if (mutationResult.isError) {
        throw mutationResult.error;
    }
    return mutationResult;
}