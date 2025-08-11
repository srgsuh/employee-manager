import {useForm} from "react-hook-form";
import type {LoginData} from "../services/AuthClient.ts";
import {Alert, Button, Field, Input, Stack} from "@chakra-ui/react";
import {type FC, useState} from "react";

interface Props {
    submitter: (data: LoginData) => Promise<boolean>,
}

const LoginForm: FC<Props> = ({submitter}) => {
    const {register, handleSubmit, formState: { errors }, reset, resetField} = useForm<LoginData>();
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const onSubmit = handleSubmit(async (data) => {
        const isSuccess = await submitter(data);
        if (isSuccess) {
            reset();

        }
        else {
            setIsAlert(true);
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start" maxW="sm">
                <Field.Root invalid={!!errors.email}>
                    <Field.Label>Email</Field.Label>
                    <Input {...register("email",
                        {required: {value: true, message: "Email is required"}})
                    } onFocus={() =>{
                        resetField("email");
                        setIsAlert(false);
                    }}/>
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                    <Field.Label>Password</Field.Label>
                    <Input {...register("password", {
                        required: {value: true, message: "Password is required"},})
                    } type="password" onFocus={() => {
                        resetField("password");
                        setIsAlert(false);
                    }}/>
                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>

                <Button type="submit">Submit</Button>
                {isAlert && <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Title>Wrong credentials</Alert.Title>
                </Alert.Root>}
            </Stack>
        </form>
    )
};

export default LoginForm;