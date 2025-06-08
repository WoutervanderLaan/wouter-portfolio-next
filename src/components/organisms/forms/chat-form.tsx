import Button from "@/components/atoms/button/button";
import Form from "@/components/atoms/form/form";
import Text from "@/components/atoms/text/text";
import clsx from "clsx";
import { useFocusRing } from "react-aria";

const ChatForm = ({
    onSubmit,
    isDisabled,
}: {
    onSubmit: (text: string) => void;
    isDisabled?: boolean;
}) => {
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <Form
            action={(e) => {
                const text = e.get("query")?.toString();
                if (!text) return;

                onSubmit(text);
            }}
        >
            <label className="flex flex-col">
                <Text.Paragraph as="span">Ask a question:</Text.Paragraph>
                <textarea
                    rows={2}
                    {...focusProps}
                    disabled={isDisabled}
                    className={clsx(
                        "flex flex-1 resize-none border border-black p-2 text-base font-thin ring-offset-2 transition focus:outline-none",
                        {
                            "outline-none focus-visible:ring-4 focus-visible:ring-blue-500":
                                isFocusVisible,
                        },
                    )}
                    placeholder="Type a message..."
                    required
                    name="query"
                />
            </label>

            <Button type="submit" variant="primary" isDisabled={isDisabled}>
                <Text.Paragraph className="text-white" as="span">
                    Send
                </Text.Paragraph>
            </Button>
        </Form>
    );
};

export default ChatForm;
