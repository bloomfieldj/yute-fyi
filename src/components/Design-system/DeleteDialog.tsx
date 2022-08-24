import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";
import { styled, keyframes } from "stitches.config";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: "$blackA11",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: "$background",
  borderRadius: 6,
  boxShadow: "0px 0px 40px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "500px",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

function Content({ children, ...props }: { children: React.ReactNode }) {
  return (
    <AlertDialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </AlertDialogPrimitive.Portal>
  );
}

const StyledTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  color: "$mauve12",
  fontSize: 17,
  fontWeight: 500,
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: 20,
  color: "$mauve11",
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = Content;
export const AlertDialogTitle = StyledTitle;
export const AlertDialogDescription = StyledDescription;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

// Your app...
const Flex = styled("div", { display: "flex" });

const TableButton = styled("button", {
  all: "unset",
  color: "$red9",
  "&:hover": {
    cursor: "pointer",
    color: "$red11",
  },
});

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: "$violet11",
        boxShadow: `0 2px 10px ${"$blackA7"}`,
        "&:hover": { backgroundColor: "$mauve3" },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      red: {
        backgroundColor: "$red4",
        color: "$red11",
        "&:hover": { backgroundColor: "$red5" },
        "&:focus": { boxShadow: "0 0 0 2px " },
      },
      mauve: {
        backgroundColor: "$mauve4",
        color: "$mauve11",
        "&:hover": { backgroundColor: "$mauve5" },
        "&:focus": { boxShadow: "0 0 0 2px" },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});

const DeleteDialog = ({ post_id }: { post_id: string }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handlePostDeletion = async (id: string) => {
    const { error } = await supabaseClient
      .from("submissions")
      .delete({ returning: "minimal" })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return false;
    } else {
      alert("Post deleted.");
      refreshData();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <TableButton>Delete</TableButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete your post from our database. <br /> This
          action cannot be undone.
        </AlertDialogDescription>
        <Flex css={{ justifyContent: "flex-end" }}>
          <AlertDialogCancel asChild>
            <Button variant="mauve" css={{ marginRight: 25 }}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => handlePostDeletion(post_id)} variant="red">
              Yes, delete post.
            </Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
