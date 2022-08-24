import { styled } from "stitches.config";
import Link from "next/link";

interface Props {
  href: string;
  content: string;
  mx?: string;
  padding?: string;
}

const A = styled("a", {
  all: "unset",
  p: "$2",
  background: "$button",
  color: "$slate7",
  boxShadow: "0px 4px",
  width: "fit-content",
  my: "$1",
  mx: "auto",
  br: "$4",
  border: `solid 1px ${"$slate7"}`,
  fontSize: "$3",
  fontWeight: "500",
  "@bp1": {
    fontSize: "$4",
  },
  "@bp2": {
    fontSize: "$5",
  },
  "&:hover": {
    background: "$buttonHover",
    cursor: "pointer",
    boxShadow: "0px 1px",
    transform: "translateY(3px)",
  },
  "&:focus": {
    background: "$buttonHover",
    boxShadow: "0px 2px",
    transform: "translateY(2px)",
  },
  transition: "all 300ms ease",
});

const Span = styled("span", {
  color: "$text",
});

const LinkButton = ({ href, content, mx }: Props) => {
  return (
    <Link href={href} scroll={true} passHref>
      <A css={{ mx: mx }}>
        <Span>{content}</Span>
      </A>
    </Link>
  );
};

export default LinkButton;
