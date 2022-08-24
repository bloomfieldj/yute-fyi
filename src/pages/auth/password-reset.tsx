import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { styled } from "stitches.config";
import Layout from "../../components/Design-system/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

const Container = styled("div", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

const HeroBox = styled("section", {
  px: "$2",
  py: "$2",
  ta: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  "@bp1": {
    px: "$4",
  },
  "@bp2": {
    px: "$8",
  },
  "@bp3": {
    px: "$2",
  },
});

const Title = styled("h1", {
  fontSize: "$7",
  px: "$3",
  fontWeight: "500",
  textAlign: "center",
  my: "$2",
  color: "$title",
  "@bp0": {
    px: "$8",
  },
  "@bp1": {
    fontSize: "$8",
    px: "0px",
  },
  "@bp2": {
    fontSize: "$9",
    px: "$8",
  },
  "@bp3": {
    px: "$2",
  },
});

const Subtitle = styled("h2", {
  fontSize: "$5",
  px: "$4",
  fontWeight: "400",
  textAlign: "center",
  my: "0",
  color: "$title",
  "@bp1": {
    fontSize: "$7",
    px: "0px",
  },
  "@bp2": {
    fontSize: "$8",
  },
});

const Form = styled("form", {
  width: "80vw",
  maxWidth: "400px",
  mx: "auto",
});

const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  flexDirection: "column",
  mx: "$1",
  my: "$3",
});

const Label = styled("label", {
  py: "$1",
  fontSize: "18px",
});

const Input = styled("input", {
  py: "$1",
  fontSize: "18px",
});

const Button = styled("button", {
  all: "unset",
  display: "flex",
  justifySelf: "center",
  p: "$3",
  border: `solid 1px ${"$slate7"}`,
  background: "$button",
  color: "$slate7",
  boxShadow: "0px 4px",
  width: "fit-content",
  mx: "auto",
  my: "$2",
  br: "$4",
  fontSize: "$3",
  fontWeight: "500",
  "@bp1": {
    fontSize: "$4",
  },
  "@bp2": {
    fontSize: "$5",
  },
  "&:hover": {
    background: "$buttonHover",
    cursor: "pointer",
    boxShadow: "0px 1px",
    transform: "translateY(3px)",
  },
  "&:focus": {
    background: "$buttonHover",
    boxShadow: "0px 2px",
    transform: "translateY(2px)",
  },
  transition: "all 300ms ease",
});

const Span = styled("span", {
  color: "$text",
});

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [working, setWorking] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/posts");
    }
  }, [user, router]);

  const resetPassword = async (email: string) => {
    setWorking(true);
    const { error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/password-recovery`,
      }
    );

    if (error) {
      setWorking(false);
      alert(error.message);
    } else {
      setWorking(false);
      alert("Check your email to reset your password.");
      router.push("/");
    }
  };

  const pageSEO = {
    title:
      "yute.fyi: Add to our list of free activities, opportunities, programs and services for Black Canadian Youth.",
    description:
      "yute.fyi: Add to our list of free activities, opportunities, programs and services for Black Canadian Youth.",
    image:
      "https://res.cloudinary.com/dligqmt0x/image/upload/v1647905264/yute_banner_1_ranvpu.png",
  };

  return (
    <Container>
      <SEO tagInfo={pageSEO} />
      <Header />
      <Layout>
        <HeroBox>
          <Title>Yute.fyi</Title>
          <Subtitle>Reset your password</Subtitle>
        </HeroBox>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            resetPassword(email);
          }}
        >
          <Fieldset>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </Fieldset>

          {working ? (
            <Button disabled>
              <Span>Working...</Span>
            </Button>
          ) : (
            <Button type="submit">
              <Span>Send reset email</Span>
            </Button>
          )}
        </Form>
      </Layout>
      <Footer />
    </Container>
  );
};

export default Login;
