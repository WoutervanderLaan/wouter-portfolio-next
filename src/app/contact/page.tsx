import StyledLink from "@/components/atoms/link/link";
import Text from "@/components/atoms/text/text";
import Instagram from "@/components/icons/instagram";

const Contact = () => (
  <main className="mx-80 flex flex-col gap-4">
    <Text.Paragraph>
      Email:{" "}
      <StyledLink href="mailto:woutervdlaan93@gmail.com<">
        woutervdlaan93@gmail.com
      </StyledLink>
    </Text.Paragraph>
    <StyledLink
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
    </StyledLink>
  </main>
);

export default Contact;
