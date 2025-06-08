import clsx from "clsx";
import { FormHTMLAttributes, PropsWithChildren } from "react";

const Form = ({
    children,
    className,
    ...rest
}: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) => (
    <form className={clsx("flex flex-col gap-4", className)} {...rest}>
        {children}
    </form>
);

export default Form;
