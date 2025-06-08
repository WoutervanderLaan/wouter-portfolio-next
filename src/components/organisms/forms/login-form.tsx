import Button from "@/components/atoms/button/button";
import Form from "@/components/atoms/form/form";
import TextInput from "@/components/atoms/text-input/text-input";
import Text from "@/components/atoms/text/text";
import { useAuth } from "@/context/auth-context";

const LoginForm = () => {
    const { login } = useAuth();

    return (
        <Form action={login} className="max-w-[400px]">
            <TextInput name="username" type="email" label="Email" required />
            <TextInput
                name="password"
                type="password"
                label="Password"
                required
            />

            <Button type="submit" variant="primary">
                <Text.Paragraph className="text-white">Log in</Text.Paragraph>
            </Button>
        </Form>
    );
};

export default LoginForm;
