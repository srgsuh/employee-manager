import {useForm} from "react-hook-form";
import type {LoginData} from "../services/AuthClient.ts";
import {Alert, Button, Field, Input, Stack} from "@chakra-ui/react";
import {type FC, useState} from "react";

interface Props {
    submitter: (data: LoginData) => Promise<void>,
}

const LoginForm: FC<Props> = ({submitter}) => {
    const {register, handleSubmit, formState: { errors }, reset, resetField} = useForm<LoginData>();
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const onSubmit = handleSubmit(async (data) => {
        setAlertMessage(null);
        setIsPending(true);
        submitter(data)
            .then(()=> {
                reset();
            })
            .catch((e: unknown) => {
                setAlertMessage(e instanceof Error? e.message: `${e}`);
            })
            .finally(()=> setIsPending(false));
    })

    return (
        <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start" maxW="sm">
                <Field.Root invalid={!!errors.email}>
                    <Field.Label>Email</Field.Label>
                    <Input {...register("email",
                        {required: {value: true, message: "Email is required"}})
                    } onFocus={() =>{
                        setAlertMessage(null);
                    }}/>
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                    <Field.Label>Password</Field.Label>
                    <Input {...register("password", {
                        required: {value: true, message: "Password is required"},})
                    } type="password" onFocus={() => {
                        resetField("password");
                        setAlertMessage(null);
                    }}/>
                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>

                <Button type="submit" w={"100%"}
                        loading={isPending}
                        loadingText={"Requesting..."}
                >Submit</Button>
                {!!alertMessage && <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Title>{alertMessage}</Alert.Title>
                </Alert.Root>}
            </Stack>
        </form>
    )
};

export default LoginForm;