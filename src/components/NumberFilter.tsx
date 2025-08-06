import {Box, HStack, IconButton, Text, VStack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {FaCheck, FaRegEdit} from "react-icons/fa";
import {type FC, useState} from "react";
import {ImCancelCircle} from "react-icons/im";
import {minAge, maxAge, minSalary, maxSalary} from "../config/employees-config.json"
import useEmployeeFilter, {type EmployeeFilter} from "../state-management/store.tsx";
import {useColorModeValue} from "./ui/color-mode.tsx";

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
    handleRangeUpdate: (values: { from: number | null, to: number | null }) => void,
}

const NumberFilter: FC<NumberFilterProps> = ({title}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const state = useEmployeeFilter();

    const {from, to, min, max, handleRangeUpdate} = initVariables(title === "Age", state);

    const {handleSubmit, register, formState: {errors}, reset} = useForm<FormValues>({
        defaultValues: {from, to}
    });

    const borderColor = useColorModeValue("gray.200", "gray.700");

    const submitHandler = (fv: FormValues) => {
        handleRangeUpdate({from: fv.from, to: fv.to});
        setIsEditing(false);
    }

    const resetHandler = () => {
        reset({from: min, to: max});
        handleRangeUpdate({from: null, to: null});
        setIsEditing(false);
    }

    return (
        <Box border={"1px solid"} borderRadius={"md"} borderColor={borderColor} p={"1"}>
            {isEditing ? (
                <VStack asChild>
                    <form onSubmit={handleSubmit(submitHandler)} name={"Range"}>
                        <HStack>
                            <label htmlFor={"from"}>lower</label>
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
                        </HStack>
                        {errors && <Text color="red" fontSize={"2xs"}>{errors.from?.message}</Text>}
                        <HStack>
                            <label htmlFor={"to"}>upper</label>
                            <Box asChild borderWidth={"1px"} borderRadius={"sm"}>
                                <input id={"to"} type="number" {...register("to",
                                    {
                                        required: {value: true, message: "Value is required"},
                                        valueAsNumber: true,
                                        max: {value: max, message: `Value must be less or equal to ${max}`},
                                        validate: (value, formValues) => {
                                            if (value < formValues.from) {
                                                return `Value must exceed lower value`
                                            }
                                            return undefined;
                                        }
                                    }
                                )}/>
                            </Box>
                        </HStack>
                        {errors && <Text color="red" fontSize={"2xs"}>{errors.to?.message}</Text>}
                        <HStack justify={"space-around"}>
                            <IconButton variant={"outline"}
                                        size={"xs"}
                                        type={"submit"}
                                        colorPalette={"green"}>
                                <FaCheck/>
                            </IconButton>
                            <IconButton variant={"outline"}
                                        onClick={resetHandler}
                                        colorPalette={"red"}
                                        size={"xs"}>
                                <ImCancelCircle/>
                            </IconButton>
                        </HStack>
                    </form>
                </VStack>
            ) : (
                <HStack>
                    <Text>{`${title}: ${from} - ${to}`}</Text>
                    <IconButton size={"xs"}
                                variant={"ghost"}
                                onClick={() => setIsEditing(true)}
                                colorPalette={"purple"}
                    >
                        <FaRegEdit/>
                    </IconButton>
                </HStack>

            )
            }
        </Box>
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
            handleRangeUpdate: (values: { from: number | null, to: number | null }) => {
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
            handleRangeUpdate: (values: { from: number | null, to: number | null }) => {
                state.setSalaryFrom(values.from);
                state.setSalaryTo(values.to);
            }
        }
    }
}