import type {Employee, SearchObject} from "../model/dto-types.ts";
import appConfig from "../config/config.ts";
import {useQuery} from "@tanstack/react-query";

export default function useGetEmployees(
    queryFn: () => Promise<Employee[]>,
    searchObject?: SearchObject
) {
    const queryKey = searchObject? ["/employees", searchObject]: ["/employees"];
    const staleTime = appConfig.query.staleTime;

    return useQuery<Employee[], Error>({ queryKey, queryFn, staleTime });
}