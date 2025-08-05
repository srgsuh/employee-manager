import {Box, HStack, IconButton, Text, VStack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {FaCheck, FaRegEdit} from "react-icons/fa";
import {type FC, useState} from "react";
import {ImCancelCircle} from "react-icons/im";
import {minAge, maxAge, minSalary, maxSalary} from "../config/employees-config.json"
import useEmployeeFilter, {type EmployeeFilter} from "../state-management/store.tsx";

interface NumberFilterProps {
    title: "Age" | "Salary",
}

interface FormValues {
    from: number,
    to: number,
}

interface NumberFilterVariables {
    from: number,
    to: number,
    min: number,
    max: number,
    onSubmit: (values: { from: number, to: number }) => void,
}

const NumberFilter: FC<NumberFilterProps> = ({title}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const state = useEmployeeFilter();

    const {from, to, min, max, onSubmit} = initVariables(title === "Age", state);

    const {handleSubmit, register, formState: {errors}} = useForm<FormValues>({
        defaultValues: {from, to}
    });

    const submitHandler = (fv: FormValues) => {
        onSubmit({from: fv.from, to: fv.to});
        setIsEditing(false);
    }

    return (
        <>
            {isEditing ? (
                <VStack asChild>
                    <form onSubmit={handleSubmit(submitHandler)} name={"Range"}>
                        <HStack>
                            <label htmlFor={"from"}>{`${title} >=`}</label>
                            <VStack>
                                <Box asChild borderWidth={"1px"} borderRadius={"sm"}>
                                    <input id={"from"} type="number" {...register("from",
                                        {
                                            required: {value: true, message: "Value is required"}
                                            , min: {value: min, message: `Value must be greater or equal to ${min}`}
                                            , max: {value: max, message: `Value must be less or equal to ${max}`}
                                            , valueAsNumber: true
                                        })
                                    }
                                    />
                                </Box>
                                {errors && <Text as={"div"}>{errors.from?.message}</Text>}
                            </VStack>
                        </HStack>
                        <HStack>
                            <label htmlFor={"to"}>{`${title} <=`}</label>
                            <VStack>
                                <Box asChild borderWidth={"1px"} borderRadius={"sm"}>
                                    <input id={"to"} type="number" {...register("to",
                                        {
                                            required: {value: true, message: "Value is required"},
                                            valueAsNumber: true,
                                            max: {value: max, message: `Value must be less or equal to ${max}`},
                                            validate: (value, formValues) => {
                                                if (value < formValues.to) {
                                                    return `Value must be greater or equal to the ${formValues.to}`
                                                }
                                                return undefined;
                                            }
                                        }
                                    )}/>
                                </Box>
                                {errors && <Text as={"div"}>{errors.to?.message}</Text>}
                            </VStack>
                        </HStack>
                        <HStack justify={"space-around"}>
                            <IconButton variant={"outline"}
                                        size={"xs"}
                                        type={"submit"}
                                        colorPalette={"green"}>
                                <FaCheck/>
                            </IconButton>
                            <IconButton variant={"outline"}
                                        onClick={() => {
                                            setIsEditing(false)
                                        }}
                                        colorPalette={"red"}
                                        size={"xs"}>
                                <ImCancelCircle/>
                            </IconButton>
                        </HStack>
                    </form>
                </VStack>
            ) : (
                <HStack>
                    <Text>{`${title}: from ${from} to ${to}`}</Text>
                    <IconButton size={"xs"}
                                variant={"ghost"}
                                onClick={() => setIsEditing(true)}
                    >
                        <FaRegEdit/>
                    </IconButton>
                </HStack>

            )
            }
        </>
    );
};

export default NumberFilter;

function initVariables(isAge: boolean, state: EmployeeFilter): NumberFilterVariables {
    if (isAge) {
        return {
            from: state.ageFrom || minAge,
            to: state.ageTo || maxAge,
            min: minAge,
            max: maxAge,
            onSubmit: (values: { from: number, to: number }) => {
                state.setAgeFrom(values.from);
                state.setAgeTo(values.to);
            }
        }
    } else {
        return {
            from: state.salaryFrom || minSalary,
            to: state.salaryTo || maxSalary,
            min: minSalary,
            max: maxSalary,
            onSubmit: (values: { from: number, to: number }) => {
                state.setSalaryFrom(values.from);
                state.setSalaryTo(values.to);
            }
        }
    }
}