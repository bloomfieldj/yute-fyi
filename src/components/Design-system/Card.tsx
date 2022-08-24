import { styled, keyframes } from "stitches.config";
import {
  ExternalLinkIcon,
  PersonIcon,
  SewingPinFilledIcon,
  Share1Icon,
  CopyIcon,
  CalendarIcon,
  Cross2Icon,
} from "@modulz/radix-icons";
import format from "date-fns/format";
import React, { useState, useEffect } from "react";

import { Toast, ToastTitle, ToastDescription } from "./Toast";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toolbar from "@radix-ui/react-toolbar";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

//Card
const CardArea = styled(Dialog.Trigger, {
  all: "unset",

  color: "$text",
  boxShadow: "0px 0px 5px -2px",
  borderRadius: "$2",
  linearGradient: `135deg, ${"$gradient3"} 0%, ${"$gradient4"} 100%`,

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",

  minWidth: "280px",
  maxWidth: "400px",
  width: "100%",
  minHeight: "220px",
  height: "100%",
  mx: "auto",

  padding: "16px",

  position: "relative",

  boxSizing: "border-box",

  fontSize: "17px",

  "@bp1": {
    padding: "32px",
  },

  "@bp3": {
    maxWidth: "720px",
  },

  "&:hover": {
    cursor: "pointer",
    color: "$hover",
    boxShadow: "0px 0px 15px -3px",
    linearGradient: `135deg, ${"$gradient1"} 0%, ${"$gradient2"} 100%`,
  },

  "&:focus": {
    cursor: "pointer",
    boxShadow: "0px 0px 15px -3px",
    color: "$hover",
    linearGradient: `135deg, ${"$gradient1"} 0%, ${"$gradient2"} 100%`,
  },
  transition: "all 150ms ease",
});

const Title = styled("h4", {
  fontSize: "17px",
  marginTop: "0px",
  marginBottom: "0px",
});

const Organization = styled("p", { marginTop: 2 });

const Description = styled("div", {
  lineHeight: "150%",
  minHeight: "77px",
});

const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  "& p": {
    margin: "0px",
  },
});

const Data = styled("div", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "space-between",
  margin: "auto",
  marginTop: "18px",
});

// Dialog

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: "$overlay",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const Content = styled(Dialog.Content, {
  background: "$background",
  boxShadow: "0px 0px 50px -20px",
  fontSize: "17px",
  borderRadius: "8px",
  position: "fixed",
  boxSizing: "border-box",
  lineHeight: "1.5",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "700px",
  maxHeight: "85vh",
  padding: 25,
  margin: "auto",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },

  "&:focus": { outline: "none" },
});

type ContentProps = {
  children: React.ReactNode;
};

function DialogContent({ children, ...props }: ContentProps) {
  return (
    <Dialog.Portal>
      <DialogOverlay />
      <Content {...props}>{children}</Content>
    </Dialog.Portal>
  );
}
const DialogTitle = styled(Dialog.Title, {
  padding: "0px 10px",
  marginBottom: "0px",
});

const DialogSubtitle = styled("p", {
  marginTop: "0px",
  fontSize: "18px",
  fontWeight: "400",
});

const DialogDescription = styled(Dialog.Description, {
  padding: "0px 10px",
});

const DialogClose = styled(Dialog.Close, {});

const ToolbarRoot = styled(Toolbar.Root, {
  br: "$1",
});

const ToolbarButton = styled(Toolbar.Button, {
  all: "unset",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: 26,
  px: "$2",
  py: "$4",
  my: "$3",
  borderRadius: "$2",
  boxSizing: "border-box",
  color: "$text",
  boxShadow: "0 0 5px",
  lineHeight: "1",
  linearGradient: `135deg, ${"$gradient4"} 0%, ${"$gradient3"} 50%, ${"$gradient4"} 100%`,

  "&:hover": {
    color: "$hover",
    cursor: "pointer",
    boxShadow: "0 0 5px 3px",
  },
  "&:focus": {
    color: "$hover",
    boxShadow: "0 0 5px 3px",
  },
  transition: "all 50ms ease",
});

const ToolbarLink = styled(Toolbar.Link, {
  all: "unset",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: 26,
  px: "$2",
  py: "$4",
  borderRadius: "$2",
  boxSizing: "border-box",
  color: "$text",
  boxShadow: "0 0 5px",
  lineHeight: "1",
  linearGradient: `135deg, ${"$gradient4"} 0%, ${"$gradient3"} 50%, ${"$gradient4"} 100%`,
  "&:hover": {
    color: "$hover",
    cursor: "pointer",
    boxShadow: "0 0 5px 3px",
  },
  "&:focus": {
    color: "$hover",
    boxShadow: "0 0 5px 3px",
  },
  transition: "all 50ms ease",
});

const IconBox = styled("span", {
  display: "block",
  position: "absolute",
  top: "10px",
  right: "10px",
});

const IconButton = styled("button", {
  all: "unset",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$text",
  position: "absolute",
  br: "$2",
  top: 10,
  right: 10,

  "&:hover": {
    backgroundColor: "$slate6",
    boxShadow: "0px 0px 2px",
    color: "$hover",
    cursor: "pointer",
  },
  "&:focus": {
    backgroundColor: "$slate6",
    boxShadow: "0px 0px 2px",
    color: "$hover",
  },
});

export type CardTypes = {
  id: string;
  user_id?: string;
  title: string;
  organization: string;
  description: string;
  location: string;
  min_age: number;
  max_age: number;
  ongoing: boolean;
  deadline: string;
  start_date: string;
  end_date: string;
  url: string;
  verified: boolean;
  clicks: number;
  copies: number;
  shares: number;
  created?: Date;
};

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd MMM");
};

const Card = (props: CardTypes) => {
  let {
    id,
    title,
    organization,
    description,
    deadline,
    location,
    min_age,
    max_age,
    ongoing,
    start_date,
    end_date,
    url,
    clicks,
    copies,
    shares,
  } = props;
  const [copied, setCopied] = useState(false);
  const timerRef = React.useRef(0);

  const updateClicks = async () => {
    const { data, error } = await supabaseClient
      .from("submissions")
      .update({ clicks: clicks + 1 }, { returning: "representation" })
      .match({ id: id });

    if (error) {
      throw error;
    }

    if (data) {
      clicks = data[0].clicks;
    }
  };

  const updateCopies = async () => {
    const { data, error } = await supabaseClient
      .from("submissions")
      .update({ copies: copies + 1 }, { returning: "minimal" })
      .match({ id: id });

    if (error) {
      throw error;
    }

    if (data) {
      copies = data[0].copies;
    }
  };

  const updateShares = async () => {
    const { data, error } = await supabaseClient
      .from("submissions")
      .update({ shares: shares + 1 }, { returning: "minimal" })
      .match({ id: id });

    if (error) {
      throw error;
    }

    if (data) {
      shares = data[0].shares;
    }
  };

  useEffect(() => {
    clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <Dialog.Root modal={true}>
        <CardArea>
          <Title>{title}</Title>
          <Organization>{organization}</Organization>
          <Description>{description}</Description>
          <br />
          <Data>
            <Info>
              <SewingPinFilledIcon />
              <p>{location}</p>
            </Info>
            <Info>
              <PersonIcon />
              <p>
                {min_age} - {max_age} y/o
              </p>
            </Info>
            <Info>
              <CalendarIcon />
              {ongoing ? (
                <p> Ongoing</p>
              ) : (
                <p>
                  {formatDate(start_date)} - {formatDate(end_date)}{" "}
                </p>
              )}
            </Info>
            <IconBox>
              <ExternalLinkIcon height={20} width={20} />
            </IconBox>
          </Data>
        </CardArea>

        <DialogContent>
          <DialogTitle>
            {title}
            <br />
            <DialogSubtitle> {organization}</DialogSubtitle>
          </DialogTitle>
          <DialogDescription>
            {description}
            <Data>
              <Info>
                <SewingPinFilledIcon />
                <p>{location}</p>
              </Info>
              <Info>
                <PersonIcon />
                {max_age ? (
                  <p>
                    {min_age} - {max_age} y/o
                  </p>
                ) : (
                  <p> {min_age} &#43; y/o</p>
                )}
              </Info>
              <Info>
                <CalendarIcon />
                {ongoing ? (
                  <p> Ongoing</p>
                ) : (
                  <p>
                    {formatDate(start_date)} - {formatDate(end_date)}{" "}
                  </p>
                )}
              </Info>
            </Data>
          </DialogDescription>
          <ToolbarRoot orientation="vertical">
            <ToolbarLink
              href={url}
              target="_blank"
              rel="noopenner noreferrer"
              onClick={() => updateClicks()}
            >
              {deadline ? (
                <span>
                  Register by {format(new Date(deadline), "MMM do yyyy")}
                </span>
              ) : (
                <span>Register</span>
              )}
              <ExternalLinkIcon />
            </ToolbarLink>

            <ToolbarButton
              onClick={() =>
                navigator.clipboard
                  .writeText(
                    `${title} \n${description}\n${url}${
                      deadline
                        ? `\nRegister by ${format(
                            new Date(deadline),
                            "MMM do yyyy"
                          )}!`
                        : null
                    }`
                  )
                  .then(
                    () => {
                      setCopied(false);
                      window.clearTimeout(timerRef.current);
                      timerRef.current = window.setTimeout(() => {
                        setCopied(true);
                      }, 50);
                      updateCopies();
                    },
                    () => alert("Unable to copy information, please try again.")
                  )
              }
            >
              <span> Copy </span>
              <CopyIcon />
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                navigator
                  .share({
                    title: title,
                    text: `${description}${
                      deadline
                        ? `\nRegister by ${format(
                            new Date(deadline),
                            "MMM do yyyy"
                          )}!`
                        : null
                    }`,
                    url: url,
                  })
                  .then(
                    () => {
                      updateShares();
                    },
                    () =>
                      alert("Unable to share information, please try again.")
                  )
              }
            >
              <span> Share </span> <Share1Icon />{" "}
            </ToolbarButton>
          </ToolbarRoot>
          <DialogClose asChild>
            <IconButton>
              <Cross2Icon />
            </IconButton>
          </DialogClose>
        </DialogContent>
      </Dialog.Root>

      <Toast open={copied} onOpenChange={setCopied}>
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription asChild>
          <p> Copied to clipboard! </p>
        </ToastDescription>
      </Toast>
    </>
  );
};

export default Card;
