import { styled, keyframes } from "stitches.config";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React from "react";

const enterFromRight = keyframes({
  from: { transform: "translateX(200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: "translateX(-200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(200px)", opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(-200px)", opacity: 0 },
});

const MenuContent = styled(NavigationMenu.Content, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  linearGradient: `${"$gradient5"} 0%, ${"$gradient6"} 100%`,
  color: "$text",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "250ms",
    animationTimingFunction: "ease",
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight },
  },
});

const ContentList = styled("ul", {
  display: "grid",
  padding: "$2",
  margin: "$1",
  columnGap: 10,
  listStyle: "none",
  "@bp2": {
    gridTemplateColumns: "1fr 1fr",
  },
});

const ListItem = styled("li", {});

interface Props {
  children: JSX.Element;
}

const ContentListItem = ({ children, ...props }: Props) => (
  <ListItem {...props}>{children}</ListItem>
);

export { MenuContent, ContentList };
export default ContentListItem;
