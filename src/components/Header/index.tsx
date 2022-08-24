import { styled } from "stitches.config";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

const HeaderBox = styled("header", {
  p: "$2",
  display: "flex",
  jc: "space-between",
  alignItems: "center",
  position: "relative",
});
const A = styled("a", {
  all: "unset",
  color: "$linkHover",
  p: "$2",
  br: "$1",
  "&:hover": {
    color: "$text",
    cursor: "pointer",
    transform: "translateY(4px)",
  },
  "&:focus": {
    color: "$text",
    boxShadow: "0px 0px 5px",
    transform: "translateY(4px)",
  },
  transition: "all 500ms ease",
});

const Button = styled("button", {
  all: "unset",
  color: "$linkHover",
  p: "$2",
  br: "$1",
  "&:hover": {
    color: "$text",
    cursor: "pointer",
    transform: "translateY(4px)",
  },
  "&:focus": {
    color: "$text",
    boxShadow: "0px 0px 5px",
    transform: "translateY(4px)",
  },
  transition: "all 500ms ease",
});

const Header = () => {
  const router = useRouter();
  const { user } = useUser();

  const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <HeaderBox>
      <Link href="/" passHref>
        <A>FNDRS.fyi</A>
      </Link>
      {/* <DesktopNav /> */}

      {user ? (
        <>
          <Link href="/posts" passHref>
            <A>Dashboard</A>
          </Link>
          <Button onClick={logout}>Sign out</Button>
        </>
      ) : (
        <Link href="/auth/login" passHref>
          <A>Sign in to add posts</A>
        </Link>
      )}
    </HeaderBox>
  );
};

export default Header;
