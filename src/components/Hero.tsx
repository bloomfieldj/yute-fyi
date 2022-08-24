import { styled } from "stitches.config";

const HeroBox = styled("section", {
  px: "$2",
  py: "$2",
  ta: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  "@bp1": {
    px: "$4",
  },
  "@bp2": {
    px: "$8",
  },
  "@bp3": {
    px: "$2",
  },
});

const Title = styled("h1", {
  fontSize: "$7",
  px: "$3",
  fontWeight: "500",
  textAlign: "center",
  my: "$2",
  color: "$title",
  "@bp0": {
    px: "$8",
  },
  "@bp1": {
    fontSize: "$8",
    px: "0px",
  },
  "@bp2": {
    fontSize: "$9",
    px: "$8",
  },
  "@bp3": {
    px: "$2",
  },
});

const Subtitle = styled("h2", {
  fontSize: "$5",
  px: "$4",
  fontWeight: "400",
  textAlign: "center",
  my: "0",
  color: "$title",
  "@bp1": {
    fontSize: "$7",
    px: "0px",
  },
  "@bp2": {
    fontSize: "$8",
  },
});

const Hero = () => {
  return (
    <HeroBox>
      <Title>Connecting Black Canadian Founders</Title>
      <Subtitle>
        with education, services, opportunities and community.
      </Subtitle>
    </HeroBox>
  );
};

export default Hero;
