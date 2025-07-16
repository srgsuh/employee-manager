import type {ApiClient} from "../services/ApiClient.ts";
import type {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import type {Employee} from "../model/dto-types.ts";
import type {AxiosError} from "axios";
import {Spinner} from "@chakra-ui/react";

type Props = {
    apiClient: ApiClient;
}

const EmployeeTable: FC<Props> = ({apiClient}) => {
    const queryKey = ["/employees"];
    const {isLoading, error, data} = useQuery<Employee[], AxiosError>(
        {
            queryKey,
            queryFn: () => apiClient.getAll()
        }
    );
    return (
        <div style={{padding: "20px", margin: "0"}}>
            {isLoading && <Spinner />}
            {error && <p style={{color: "red"}}>{`Error: ${error.message}`}</p>}
            {data && (<ol  type={"1"} style={{padding: "20px", listStyleType: "decimal", margin: "0"}}>
                {data.map(e=>(<li key = {e.id} style={{margin: "0"}}>
                        {`Name: ${e.fullName}, bDate: ${e.birthDate}, dep: ${e.department}, salary: ${e.salary}`}
                    </li>)
                )}
            </ol>)}
        </div>
    );
};

export default EmployeeTable;