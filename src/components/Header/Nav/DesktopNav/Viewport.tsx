import { styled, keyframes } from "stitches.config";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

const scaleIn = keyframes({
  from: { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
});

const ViewportContent = styled(NavigationMenu.Viewport, {
  position: "relative",
  background: "$slate2",
  transformOrigin: "top center",
  marginTop: 10,
  width: "100%",
  borderRadius: 6,
  zindex: 1,
  overflow: "hidden",
  boxShadow: "0px 0px 30px -15px",
  height: "var(--radix-navigation-menu-viewport-height)",
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, height, 300ms ease",
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  },
});

const ViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  top: "100%",
  left: 0,
  perspective: "2000px",
  zindex: 1,
});

const Viewport = () => {
  return (
    <ViewportPosition>
      <ViewportContent />
    </ViewportPosition>
  );
};

export default Viewport;
