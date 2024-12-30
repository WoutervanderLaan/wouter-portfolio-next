import StyledLink from "@/components/atoms/link/link";
import Text from "@/components/atoms/text/text";
import Instagram from "@/components/icons/instagram";

const Contact = () => (
  <main className="flex flex-col mx-80 gap-4">
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
      <Instagram width={20} height={20} color="gray" />
    </StyledLink>
  </main>
);

export default Contact;
