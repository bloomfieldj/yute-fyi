import { styled, keyframes } from "stitches.config";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React from "react";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const StyledIndicator = styled(NavigationMenu.Indicator, {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  height: 10,
  top: "100%",
  overflow: "hidden",
  zIndex: 1,
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, transform 300ms ease",
    '&[data-state="visible"]': { animation: `${fadeIn} 300ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 300ms ease` },
  },
});

const StyledArrow = styled("div", {
  position: "relative",
  top: "70%",
  background: "$mint12",
  width: 10,
  height: 10,
  transform: "rotate(45deg)",
});

const Indicator = () => {
  return (
    <StyledIndicator>
      <StyledArrow />
    </StyledIndicator>
  );
};

export default Indicator;
