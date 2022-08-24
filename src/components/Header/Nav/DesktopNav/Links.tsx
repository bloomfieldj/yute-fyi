import { styled } from "stitches.config";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

const NavLink = styled(NavigationMenu.Link, {
  "&[data-active]": { textDecoration: "underline" },
});

interface Props {
  href: string;
  title: string;
  description: string;
  ages: string;
}

const LinkTitle = styled("p", {
  fontWeight: 500,
  lineHeight: 1.2,
  my: 5,
});

const LinkText = styled("p", {
  all: "unset",
  color: "$linkHover",
  lineHeight: 1.4,
  fontWeight: "initial",
});

const LinkItem = styled("a", {
  all: "unset",
  display: "block",
  p: "$2",
  br: "$2",
  position: "relative",
  zIndex: "1",
  ta: "center",
  color: "$text",
  boxShadow: "0px 0px",
  "&:hover": {
    boxShadow: "0px 0px 5px",
    cursor: "pointer",
    color: "$hover",
  },
  "&:focus": {
    boxShadow: "0px 0px 5px",
    color: "$hover",
  },
  transition: "all 200ms ease",
});

const NextMenuLink = ({ href, title, description, ages }: Props) => {
  return (
    <Link href={href} passHref>
      <NavLink asChild>
        <LinkItem aria-label={`${title} for ${ages.toLowerCase()}`}>
          <LinkTitle>{title}</LinkTitle>
          <LinkText>{description}</LinkText>
        </LinkItem>
      </NavLink>
    </Link>
  );
};

export default NextMenuLink;
