import { styled } from "stitches.config";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

const Menu = styled(NavigationMenu.Root, {
  position: "relative",
  display: "flex",
  zIndex: 1,
  br: "$4",
  justifyContent: "center",
  justifySelf: "center",
});

const MenuList = styled(NavigationMenu.List, {
  all: "unset",
  listStyle: "none",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  br: "$1",
  "@bp1": {
    gap: "$1",
  },
  "@bp2": {
    gap: "$3",
  },
});

const MenuTrigger = styled(NavigationMenu.Trigger, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  p: "$1",
  color: "$linkHover",
  outline: "none",
  userSelect: "none",
  br: "$1",
  "@bp0": {
    p: "$2",
    gap: "$1",
  },
  "&:hover": {
    cursor: "pointer",
    color: "$text",
    transform: "translateY(4px)",
  },
  "&:focus": {
    color: "$text",
    boxShadow: "0px 0px 5px",
    transform: "translateY(4px)",
  },
  transition: "all 500ms ease",
});

const Span = styled("span", {
  // color: '$text',
});

const MenuSubtitle = styled("p", {
  textAlign: "center",
  fontWeight: 700,
  fontSize: "$4",
  px: "$4",
  m: "0px",
  mt: "$6",
});

export { Menu, MenuList, MenuTrigger, MenuSubtitle, Span };
