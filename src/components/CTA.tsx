import { styled } from "stitches.config";
import LinkButton from "./LinkButton";

const Section = styled("section", {
  px: "$4",
  py: "$2",
  width: "fit-content",
  mx: "auto",
  br: "$4",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0px 0px 5px -2px",
  my: "$5",
});

const Text = styled("h3", {
  mt: "0",
  mb: "$2",
});

const CTA = () => {
  return (
    <Section>
      <Text>Know something we don&apos;t ?</Text>
      <LinkButton href="/posts/add" content="Post now" mx={"auto"} />
    </Section>
  );
};

export default CTA;
