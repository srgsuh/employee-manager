import type {ApiClient} from "../services/ApiClient.ts";
import type {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import type {Employee} from "../model/dto-types.ts";
import {Avatar, Spinner, Stack, Table, Text} from "@chakra-ui/react";

type Props = {
    apiClient: ApiClient;
}

const EmployeeTable: FC<Props> = ({apiClient}) => {
    const queryKey = ["/employees"];
    const {isLoading, error, data} = useQuery<Employee[], Error>(
        {
            queryKey,
            queryFn: () => apiClient.getAll(),
            staleTime: 3_600_000
        }
    );
    return (
        <Stack p={2} height={"100%"} justify={"center"} alignItems={"center"}>
            {isLoading && <Spinner />}
            {error && <Text color={"red"}>{`Network error: ${error.message}`}</Text>}
            <Table.ScrollArea borderWidth="1px" rounded="md" height="80vh" width={"85vw"}>
                <Table.Root size="sm" stickyHeader>
                    <Table.Header>
                        <Table.Row bg="bg.subtle">
                            <Table.ColumnHeader>№</Table.ColumnHeader>
                            <Table.ColumnHeader>Img</Table.ColumnHeader>
                            <Table.ColumnHeader>Name</Table.ColumnHeader>
                            <Table.ColumnHeader>Department</Table.ColumnHeader>
                            <Table.ColumnHeader>Birthdate</Table.ColumnHeader>
                            <Table.ColumnHeader>Salary</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data?.map((e, idx) => (
                            <Table.Row key={e.id}>
                                <Table.Cell>{1 + idx}</Table.Cell>
                                <Table.Cell><Avatar.Root>
                                    <Avatar.Fallback name={e.fullName} />
                                    <Avatar.Image src={e.avatar} />
                                </Avatar.Root></Table.Cell>
                                <Table.Cell>{e.fullName}</Table.Cell>
                                <Table.Cell>{e.department}</Table.Cell>
                                <Table.Cell>{e.birthDate}</Table.Cell>
                                <Table.Cell textAlign="end">{e.salary}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        </Stack>
    );
};

export default EmployeeTable;