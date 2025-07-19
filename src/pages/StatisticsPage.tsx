import type {ApiClient} from "../services/ApiClient.ts";
import type {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import type {Employee} from "../model/dto-types.ts";
import type {DiagramProps} from "../model/types.ts";
import {HStack, Spinner, Text} from "@chakra-ui/react";

type StatisticsPageProps = {
    apiClient: ApiClient;
    StatisticsDiagram: FC<DiagramProps>;
}

const StatisticsPage: FC<StatisticsPageProps> =
    ({apiClient, StatisticsDiagram}) => {
    const queryKey = ["/employees"];
    const {isLoading, error, data} = useQuery<Employee[], Error>({
        queryKey,
        queryFn: () => apiClient.getAll(),
        staleTime: 3_600_000
    });
    return (
        <>
            {isLoading && <Spinner />}
            {error && <Text color={"red"}>{`Network error: ${error.message}`}</Text>}
            {
                data &&
                <HStack p={2} justifyContent="center" alignItems="center">
                    <StatisticsDiagram data={data}></StatisticsDiagram>
                </HStack>
            }
        </>
    );
};

export default StatisticsPage;