import type {Employee} from "../model/dto-types.ts";
import {useQuery} from "@tanstack/react-query";
import type {QueryVariables} from "../services/ApiClient.ts";

export default function useGetEmployees({queryKey, queryFn, staleTime}: QueryVariables<Employee[]>) {
    return useQuery<Employee[], Error>(
        {
            queryKey,
            queryFn,
            staleTime
        }
    );
}