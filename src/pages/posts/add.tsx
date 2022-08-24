import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { styled } from "stitches.config";
import Layout from "../../components/Design-system/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  supabaseClient,
  User,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";

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

const TextArea = styled("textarea", {
  resize: "none",
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

const Span = styled("span", {
  color: "$text",
});

const Add = ({ user }: { user: User }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const pageSEO = {
    title: "Add new post. | yute.fyi",
    description: "Add new post. | yute.fyi",
    image:
      "https://res.cloudinary.com/dligqmt0x/image/upload/v1647905264/yute_banner_1_ranvpu.png",
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      organization: { value: string };
      description: { value: string };
      location: { value: string };
      start_date: { value: Date };
      end_date: { value: Date };
      deadline: { value: Date };
      url: { value: URL };
    };

    const submission = {
      title: target.title.value,
      organization: target.organization.value,
      description: target.description.value,
      location: target.location.value,
      start_date: target.start_date.value,
      end_date: target.end_date.value,
      deadline: target.deadline.value,
      url: target.url.value,
    };

    const { deadline, start_date, end_date } = submission;

    if (start_date > end_date) {
      alert("The start date must be before the end date.");
      return false;
    }

    if (deadline > start_date) {
      alert("The regsistration deadline must be before the start date.");
      return false;
    }

    if (user) {
      setSubmitting(true);
      const { error } = await supabaseClient.from("submissions").insert(
        { user_id: user.id, ...submission },
        {
          returning: "minimal",
        }
      );

      if (error) {
        alert(error.message);
      } else {
        router.push("/posts");
      }
    }
  };

  return (
    <Container>
      <SEO tagInfo={pageSEO} />
      <Header />
      <Layout>
        <HeroBox>
          <Title>Know of an opportunity we don&apos;t?</Title>
          <Subtitle>Add it below to help spread the word!</Subtitle>
        </HeroBox>

        <Form onSubmit={handleSubmission}>
          <Fieldset>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              minLength={15}
              maxLength={40}
              size={40}
              required
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="organization">Organization</Label>
            <Input
              type="text"
              id="organization"
              name="organization"
              minLength={2}
              maxLength={40}
              size={40}
              required
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              rows={3}
              cols={40}
              minLength={45}
              maxLength={120}
              required
              spellCheck
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              id="location"
              name="location"
              minLength={2}
              maxLength={20}
              size={20}
              required
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="start_date">Start Date</Label>
            <Input type="date" id="start_date" name="start_date" required />
            <Label htmlFor="end_date">End Date</Label>
            <Input type="date" id="end_date" name="end_date" required />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="deadline">Registration Deadline</Label>
            <Input type="date" id="deadline" name="deadline" required />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="url">Registration Link</Label>
            <Input
              type="url"
              id="url"
              name="url"
              minLength={10}
              size={40}
              required
            />
          </Fieldset>

          {submitting ? (
            <LoadingButton>Posting...</LoadingButton>
          ) : (
            <Button type="submit">
              <Span>Submit</Span>
            </Button>
          )}
        </Form>
      </Layout>
      <Footer />
    </Container>
  );
};

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });

export default Add;
