import {HStack, IconButton, Text} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {FaCheck, FaRegEdit} from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import {type FC, useState} from "react";

interface NumberFilterProps {
    caption: string,
    from: number,
    to: number,
    onSubmit: (data: {from: number; to: number;}) => void,
}

interface FormValues {
    from: number,
    to: number,
}

const NumberFilter: FC<NumberFilterProps> = ({from, to, onSubmit, caption}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const {handleSubmit, register} = useForm<FormValues>({
        defaultValues: {from, to}
    });

    return (
        <>
        { isEditing? (
            <HStack asChild>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="number" {...register("from", {required: true})}/>
                    <input type="number" {...register("to", {required: true})}/>
                    <HStack justify={"space-around"}>
                        <IconButton type={"submit"} colorPalette={"green"}>
                            <FaCheck/>
                        </IconButton>
                        <IconButton onClick={() => {setIsEditing(false)}}>
                            <FcCancel/>
                        </IconButton>
                    </HStack>
                </form>
            </HStack>
            ): (
            <HStack>
                <Text>{`${caption}: from ${from} to ${to}`}</Text>
                <IconButton size={"xs"} variant={"outline"} onClick={()=>setIsEditing(true)}>
                    <FaRegEdit />
                </IconButton>
            </HStack>

        )
        }
        </>
    );
};

export default NumberFilter;