import Text from "@/components/atoms/text/text";

const Copyright = () => {
  const date = new Date();
  const year = date.getFullYear();

  return <Text.Small>{`© Wouter van der Laan ${year}`}</Text.Small>;
};

export default Copyright;
