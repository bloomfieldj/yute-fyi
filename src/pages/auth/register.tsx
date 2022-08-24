import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { styled } from "stitches.config";
import Layout from "../../components/Design-system/Layout";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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

const A = styled("a", {
  all: "unset",
  color: "$blue9",
  width: "fit-content",
  height: "fit-content",
  my: "auto",
  mx: "$2",
  "&:hover": {
    color: "$blue11",
    cursor: "pointer",
    transform: "translateY(1px)",
  },
  "&:focus": {
    color: "$blue11",
    boxShadow: "0px 2px",
    transform: "translateY(1px)",
  },
  transition: "all 300ms ease",
});

const Div = styled("div", {
  display: "flex",
  justifyContent: "center",
});

const LoadingButton = styled("button", {
  all: "unset",
  display: "flex",
  justifySelf: "center",
  p: "$3",
  border: `solid 1px ${"$slate7"}`,
  color: "$slate11",
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
  background: "$buttonHover",
  cursor: "not-allowed",
  transform: "translateY(2px)",
});

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [working, setWorking] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/posts");
    }
  }, [user, router]);

  type Registration = {
    email: string;
    password?: string;
    confirmEmail: string;
    fname: string;
    lname: string;
    organization?: string;
  };

  const register = async ({
    email,
    password,
    confirmEmail,
    fname,
    lname,
    organization,
  }: Registration) => {
    setWorking(true);

    if (email !== confirmEmail) {
      setWorking(false);
      alert("Please make sure your email addresses match.");
      return false;
    }

    const { user, error } = await supabaseClient.auth.signUp(
      {
        email,
        password,
      },
      {
        data: {
          first_name: fname,
          last_name: lname,
          email,
          organization,
        },
      }
    );

    if (error) {
      setWorking(false);
      alert(error.message);
    }

    if (user) {
      alert("Verify your email to start posting.");
      router.push("/");
    }
  };

  const pageSEO = {
    title: "Create an account | yute.fyi",
    description: "Create an account | yute.fyi",
    image:
      "https://res.cloudinary.com/dligqmt0x/image/upload/v1647905264/yute_banner_1_ranvpu.png",
  };

  return (
    <Container>
      <SEO tagInfo={pageSEO} />
      <Header />
      <Layout>
        <HeroBox>
          <Title>yute.fyi</Title>
          <Subtitle>Sign up to share opportunities with the community</Subtitle>
        </HeroBox>

        <Form
          onSubmit={(e) => {
            e.preventDefault();

            register({
              email,
              password,
              confirmEmail,
              fname,
              lname,
              organization,
            });
          }}
        >
          <Fieldset>
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </Fieldset>
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

          <Fieldset>
            <Label htmlFor="confirm_email">Confirm Email</Label>
            <Input
              id="confirm_email"
              name="confirm_email"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="Organizaion">Organization (optional)</Label>
            <Input
              id="organization"
              name="organization"
              type="text"
              autoComplete="organization"
              onChange={(e) => setOrganization(e.target.value)}
            />
          </Fieldset>

          {working ? (
            <LoadingButton> Registering... </LoadingButton>
          ) : (
            <Button type="submit">
              <Span>Register</Span>
            </Button>
          )}
        </Form>
        <Div>
          <p>Already have an account?</p>
          <Link href="/auth/login" passHref>
            <A>Sign in</A>
          </Link>
        </Div>
      </Layout>
      <Footer />
    </Container>
  );
};

export default Register;
