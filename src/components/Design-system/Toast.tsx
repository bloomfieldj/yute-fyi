import * as RawToast from "@radix-ui/react-toast";
import { styled, keyframes } from "stitches.config";

//Toast

const VIEWPORT_PADDING = 25;

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(0)" },
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const ToastProvider = RawToast.Provider;

const ToastViewport = styled(RawToast.Viewport, {
  position: "fixed",
  bottom: "5%",
  right: "5%",
  display: "flex",
  flexDirection: "column",
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 240,
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 999,
});

const Toast = styled(RawToast.Root, {
  // backgroundColor: "$slate2",
  linearGradient: `225deg, ${"$gradient6"} 0%, ${"$gradient5"} 50%, ${"$gradient6"} 100%`,
  borderRadius: 6,
  boxShadow: "0px 0px 20px -10px",
  padding: 15,
  display: "grid",
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: "auto max-content",
  columnGap: 15,
  alignItems: "center",

  "@media (prefers-reduced-motion: no-preference)": {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in forwards`,
    },
    '&[data-swipe="move"]': {
      transform: "translateX(var(--radix-toast-swipe-move-x))",
    },
    '&[data-swipe="cancel"]': {
      transform: "translateX(0)",
      transition: "transform 200ms ease-out",
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out forwards`,
    },
  },
});

const ToastTitle = styled(RawToast.Title, {
  gridArea: "title",
  marginBottom: 5,
  fontWeight: 500,
  color: "$text",
  fontSize: 15,
});

const ToastDescription = styled(RawToast.Description, {
  gridArea: "description",
  margin: 0,
  color: "$mint10",
  fontSize: 13,
  lineHeight: 1.3,
});

export {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  hide,
  slideIn,
  swipeOut,
  VIEWPORT_PADDING,
};
