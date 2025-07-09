import LoginForm from "@/components/organisms/forms/login-form";
import useAuth from "@/hooks/use-auth";
import clsx from "clsx";
import { ReactNode } from "react";

const AuthLayout = ({
    children,
    className,
}: {
    children: ReactNode | ((logout: () => Promise<void>) => ReactNode);
    className?: HTMLElement["className"];
}) => {
    const { logout, isAuthenticated } = useAuth();

    return (
        <section className={clsx("flex flex-1 flex-col", className)}>
            {!isAuthenticated && <LoginForm />}

            {isAuthenticated &&
                (typeof children === "function" ? children(logout) : children)}
        </section>
    );
};

export default AuthLayout;
