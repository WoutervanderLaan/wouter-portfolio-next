import Link from "@/components/atoms/link/link";
import Text from "@/components/atoms/text/text";
import Instagram from "@/components/icons/instagram";

const Contact = () => (
  <main className="my-20 flex flex-col gap-4 md:mx-40 lg:mx-80">
    <Text.Paragraph>
      Email:{" "}
      <Link href="mailto:woutervdlaan93@gmail.com<">
        woutervdlaan93@gmail.com
      </Link>
    </Text.Paragraph>
    <Link
      href="https://www.instagram.com/wvanderlaan/"
      target="_blank"
      rel="noreferrer"
      className="self-start"
    >
      <Instagram
        width={20}
        height={20}
        className="dark:fill-white dark:stroke-white"
      />
    </Link>
  </main>
);

export default Contact;
