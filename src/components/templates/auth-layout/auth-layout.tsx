import LoginForm from "@/components/organisms/forms/login-form";
import useAuth from "@/hooks/use-auth";
import { ClassName } from "@/lib/types/class-name";
import clsx from "clsx";
import { ReactNode } from "react";

const AuthLayout = ({
    children,
    className,
}: {
    children: ReactNode | ((logout: () => Promise<void>) => ReactNode);
    className?: ClassName<HTMLDivElement>;
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
