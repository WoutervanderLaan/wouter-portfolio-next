import Link from "@/components/atoms/link/link";
import Text from "@/components/atoms/text/text";

const Contact = () => (
    <main className="my-20 flex flex-col gap-4 md:mx-40 lg:mx-80">
        <Text.Paragraph>
            Email:{" "}
            <Link href="mailto:woutervdlaan93@gmail.com<">
                woutervdlaan93@gmail.com
            </Link>
        </Text.Paragraph>
    </main>
);

export default Contact;
