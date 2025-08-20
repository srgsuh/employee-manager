import type {ApiClient, Updater} from "../services/ApiClient.ts";
import {type FC, useEffect, useMemo} from "react";
import type {Employee, SearchObject} from "../model/dto-types.ts";
import {Avatar, HStack, Spinner, Stack, Table} from "@chakra-ui/react";
import AlertDialog from "./AlertDialog.tsx";
import useEmployeesMutation from "../hooks/useEmployeesMutation.ts";
import EmployeeEditWindow from "./EmployeeEditWindow.tsx";
import useGetEmployees from "../hooks/useGetEmployees.ts";
import useEmployeeFilter, {type EmployeeFilter, useAuthData, usePageState} from "../state-management/store.ts";
import _ from "lodash";
import {isAdminRole} from "../utils/roles-utils.ts";
import {pageSize} from "../config/employees-config.json";
import Paginator from "./Paginator.tsx";


type Props = {
    apiClient: ApiClient;
}

function buildSearchObject({department, ageTo, ageFrom, salaryTo, salaryFrom}: EmployeeFilter): SearchObject | undefined {
    const searchObject = {
        ...(department && {department}),
        ...(ageTo && {ageTo}),
        ...(ageFrom && {ageFrom}),
        ...(salaryTo && {salaryTo}),
        ...(salaryFrom && {salaryFrom})
    }
    return _.isEmpty(searchObject) ? undefined : searchObject;
}

const EmployeeTable: FC<Props> = ({apiClient}) => {
    const state = useEmployeeFilter();
    const searchObject = buildSearchObject(state);
    const {isLoading, error, isError, data} = useGetEmployees(
        () => apiClient.getAll(searchObject),
        searchObject
    );

    if (isError) {
        throw error;
    }

    const setItemCount = usePageState(s=>s.setItemCount);
    const page = usePageState(s=>s.page);

    useEffect(() => {
        setItemCount(data?.length ?? 0);
    }, [data]);

    const {startIndex, getVisibleEmployees} = useMemo(()=> {
        const first = (page - 1) * pageSize;
        const getVisibleEmployees = (): Employee[] =>
            data? data.slice(first, first + pageSize): [];
        const startIndex = first + 1;
        return {startIndex, getVisibleEmployees};
    }, [page, data]);

    const mutationDelete = useEmployeesMutation<string>(
        (id) => apiClient.deleteEmployee(id)
    );

    const role = useAuthData(s=>s.userData?.role);

    const isAdmin = isAdminRole(role);
    return (
        <Stack gap="4">
            <Stack p={2} height={"100%"} justify={"center"} alignItems={"center"}>
                {isLoading && <Spinner />}
                <Table.ScrollArea borderWidth="1px"
                                  rounded="md"
                                  width={{
                                      base:"100vw",
                                      sm:"95vw",
                                      md:"80vw"
                                  }}>
                    <Table.Root size="sm" stickyHeader>
                        <Table.Header>
                            <Table.Row bg="bg.subtle">
                                <Table.ColumnHeader>№</Table.ColumnHeader>
                                <Table.ColumnHeader>Img</Table.ColumnHeader>
                                <Table.ColumnHeader>Name</Table.ColumnHeader>
                                <Table.ColumnHeader>Department</Table.ColumnHeader>
                                <Table.ColumnHeader>Birthdate</Table.ColumnHeader>
                                <Table.ColumnHeader>Salary</Table.ColumnHeader>
                                {isAdmin && <Table.ColumnHeader>Admin options</Table.ColumnHeader>}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {getVisibleEmployees().map((e, idx) => (
                                <Table.Row key={e.id}>
                                    <Table.Cell>{startIndex + idx}</Table.Cell>
                                    <Table.Cell><Avatar.Root>
                                        <Avatar.Fallback name={e.fullName} />
                                        <Avatar.Image src={e.avatar} />
                                    </Avatar.Root></Table.Cell>
                                    <Table.Cell>{e.fullName}</Table.Cell>
                                    <Table.Cell>{e.department}</Table.Cell>
                                    <Table.Cell>{e.birthDate}</Table.Cell>
                                    <Table.Cell textAlign="end">{e.salary}</Table.Cell>
                                    {isAdmin && <Table.Cell>
                                        <HStack justify={"space-around"}>
                                            <AlertDialog itemDescription={`the record of employee ${e.fullName}`}
                                                         isDisabled={mutationDelete.isPending}
                                                         onConfirm={() => mutationDelete.mutate(e.id!)}
                                            />
                                            <EmployeeEditWindow
                                                isDisabled={mutationDelete.isPending}
                                                affector={
                                                    (empl: Employee) => {
                                                        const updater: Updater = {
                                                            id: e.id!,
                                                            fields: {...e, ...empl}
                                                        };
                                                        return apiClient.updateEmployee(updater);
                                                    }}
                                                employee={e}
                                            />
                                        </HStack>
                                    </Table.Cell>}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            </Stack>
            <Paginator />
        </Stack>
    );
};

export default EmployeeTable;