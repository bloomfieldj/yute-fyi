import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SEO from "../../../components/SEO";
import { styled } from "stitches.config";
import Layout from "../../../components/Design-system/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
// import { GetServerSideProps } from "next";
import {
  User,
  supabaseClient,
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
  maxWidth: "720px",
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

const Span = styled("span", {
  color: "$text",
});

type Post = {
  id: string;
  title: string;
  organization: string;
  description: string;
  location: string;
  start_date: Date;
  end_date: Date;
  deadline: Date;
  url: URL;
  user_id: string;
};

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

const Update = ({ post, user }: { post: Post; user: User }) => {
  const pageSEO = {
    title: "Edit your post. | yute.fyi",
    description: "Edit your post. | yute.fyi",
    image:
      "https://res.cloudinary.com/dligqmt0x/image/upload/v1647905264/yute_banner_1_ranvpu.png",
  };
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState<string>(post.title);
  const [organization, setOrganization] = useState<string>(post.organization);
  const [description, setDescription] = useState<string>(post.description);
  const [location, setLocation] = useState<string>(post.location);
  const [startDate, setStartDate] = useState<Date>(post.start_date);
  const [endDate, setEndDate] = useState<Date>(post.end_date);
  const [deadline, setDeadline] = useState<Date>(post.deadline);
  const [url, setUrl] = useState<URL>(post.url);

  const handleUpdate = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setSubmitting(true);

    if (post.user_id !== user.id) {
      alert("Unable to edit a post that doesn't belong to you.");
      router.push("/posts");
      return false;
    }

    if (startDate && endDate && startDate > endDate) {
      alert("The start date must be before the end date.");
      setSubmitting(false);
      return false;
    }

    if (deadline && startDate && deadline > startDate) {
      alert("The regsistration deadline must be before the start date.");
      setSubmitting(false);
      return false;
    }

    const updatedPost = {
      id: post.id,
      title,
      organization,
      description,
      location,
      start_date: startDate,
      end_date: endDate,
      deadline,
      url,
    };

    const { error } = await supabaseClient
      .from("submissions")
      .update(updatedPost, {
        returning: "minimal",
      })
      .eq("id", post.id);

    if (error) {
      setSubmitting(false);
      alert(error.message);
    } else {
      alert("Post updated successfully.");
      router.push("/posts");
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

        <Form onSubmit={handleUpdate}>
          <Fieldset>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              minLength={15}
              maxLength={40}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              type="date"
              id="start_date"
              name="start_date"
              value={String(startDate)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              required
            />
            <Label htmlFor="end_date">End Date</Label>
            <Input
              type="date"
              id="end_date"
              name="end_date"
              value={String(endDate)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              required
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="deadline">Registration Deadline</Label>
            <Input
              type="date"
              id="deadline"
              name="deadline"
              value={String(deadline)}
              onChange={(e) => setDeadline(new Date(e.target.value))}
              required
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="url">Registration Link</Label>
            <Input
              type="url"
              id="url"
              name="url"
              minLength={10}
              size={40}
              value={String(url)}
              onChange={(e) => setUrl(new URL(e.target.value))}
              required
            />
          </Fieldset>

          {submitting ? (
            <LoadingButton>Updating...</LoadingButton>
          ) : (
            <Button type="submit">
              <Span>Update</Span>
            </Button>
          )}
        </Form>
      </Layout>
      <Footer />
    </Container>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/login",
  async getServerSideProps(ctx) {
    const post_id = ctx?.params?.id;

    const { data } = await supabaseClient
      .from("submissions")
      .select("*")
      .eq("id", post_id)
      .single();

    return { props: { post: data } };
  },
});

export default Update;
