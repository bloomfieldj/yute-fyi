import { styled } from "stitches.config";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import * as RawToggleGroup from "@radix-ui/react-toggle-group";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

const Togglegroup = styled(RawToggleGroup.Root, {
  display: "flex",
  justifySelf: "flex-end",
  width: "fit-content",
  height: 35,
  br: "$1",
});

const ToggleGroupItem = styled(RawToggleGroup.Item, {
  all: "unset",
  color: "$slate9",
  height: 35,
  width: 35,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  br: "$1",
  "&:hover": {
    color: "$text",
    background: "$slate3",
    cursor: "pointer",
  },
  "&:focus": {
    color: "$text",
    background: "$slate3",
    boxShadow: "0px 0px 5px -2px",
  },
  "&[data-state=on]": { color: "$text" },
  transition: "all 500ms ease",
});

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Togglegroup
      type="single"
      value={theme}
      onValueChange={(value) => {
        if (value) {
          setTheme(value);
        }
      }}
    >
      <ToggleGroupItem value="light" aria-label="Light theme">
        <SunIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark theme">
        <MoonIcon />
      </ToggleGroupItem>
    </Togglegroup>
  );
};

export default ThemeToggle;
