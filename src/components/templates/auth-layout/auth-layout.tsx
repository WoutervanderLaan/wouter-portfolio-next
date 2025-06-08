import LoginForm from "@/components/organisms/forms/login-form";
import { useAuth } from "@/context/auth-context";
import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

const AuthLayout = ({
    children,
    className,
}: {
    children: (logout: () => Promise<void>) => ReactNode;
    className?: HTMLAttributes<HTMLElement>["className"];
}) => {
    const { logout, isAuthenticated } = useAuth();

    return (
        <section className={clsx("flex flex-1 flex-col", className)}>
            {!isAuthenticated && <LoginForm />}

            {isAuthenticated && children(logout)}
        </section>
    );
};

export default AuthLayout;
