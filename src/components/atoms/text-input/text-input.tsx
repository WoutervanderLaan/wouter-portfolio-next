import { useFocusRing } from "react-aria";
import Text from "../text/text";
import clsx from "clsx";

type TextInputProps = {
    name: string;
    label?: string;
    type: HTMLInputElement["type"];
    required?: boolean;
};

const TextInput = ({
    label,
    name,
    type = "text",
    required = false,
}: TextInputProps) => {
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <label className="flex flex-col" htmlFor={name}>
            {label && <Text.Paragraph as="span">{label}</Text.Paragraph>}
            <input
                required={required}
                name={name}
                type={type}
                className={clsx(
                    "border border-black p-1 text-base font-thin ring-offset-2 transition focus:outline-none",
                    {
                        "outline-none focus-visible:ring-4 focus-visible:ring-blue-500":
                            isFocusVisible,
                    },
                )}
                {...focusProps}
            />
        </label>
    );
};

export default TextInput;
