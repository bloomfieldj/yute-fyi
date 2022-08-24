import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { styled } from "stitches.config";
import Layout from "../../components/Design-system/Layout";
import { CardTypes } from "../../components/Design-system/Card";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  getUser,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const Container = styled("div", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

const Caption = styled("caption", {
  color: "$link",
});

const Thead = styled("thead", {});

const Th = styled("th", {
  px: "$1",
  py: "$2",

  fontSize: "$4",
  color: "$mauve12",
  verticalAlign: "center",
  // backgroundColor: '$mauve3',
  "&:first-of-type": {
    btlr: "$3",
  },
  "&:last-of-type": {
    btrr: "$3",
  },
  "@bp1": {
    fontSize: "$5",
  },
  variants: {
    mobileHide: {
      1: {
        display: "none",
        "@bp1": {
          display: "table-cell",
        },
      },
      2: {
        display: "none",
        "@bp2": {
          display: "table-cell",
        },
      },
    },
  },
});

const Tbody = styled("tbody", {});

const Tr = styled("tr", {
  "&:nth-of-type(even)": {},
  "&:nth-of-type(odd)": {},
  "&:last-of-type": {
    bblr: "$3",
    bbrr: "$3",
    "& td": {
      "&:first-child": {
        bblr: "$3",
      },
      "&:last-child": {
        bbrr: "$3",
      },
    },
  },
  transition: "all 300ms ease",
});

const Td = styled("td", {
  ta: "center",
  px: "$1",
  py: "$2",
  whiteSpace: "nowrap",
  mx: "auto",
  variants: {
    mobileHide: {
      1: {
        display: "none",
        "@bp1": {
          display: "table-cell",
        },
      },
      2: {
        display: "none",
        "@bp2": {
          display: "table-cell",
        },
      },
    },
  },
});

const Table = styled("table", {
  borderCollapse: "separate",
  margin: "auto",
  width: "100%",
  br: "$2",
  boxShadow: "inset 0px 0px 5px -3px",
});

const TableWrapper = styled("div", {
  overflowX: "auto",
  width: "90vw",
  "@bp2": {
    width: "100%",
  },
});

const A = styled("a", {
  all: "unset",
  color: "$linkHover",
  p: "$2",
  br: "$1",
  "&:hover": {
    color: "$text",
    cursor: "pointer",
  },
  "&:focus": {
    color: "$text",
    boxShadow: "0px 0px 5px",
  },
  transition: "all 500ms ease",
});

const Button = styled("button", {
  all: "unset",
  color: "$red9",
  "&:hover": {
    cursor: "pointer",
    color: "$red11",
  },
});

const Dashboard = ({ submissions }: { submissions: CardTypes[] }) => {
  const pageSEO = {
    title:
      "yute.fyi - Free activities, and resources for Black Canadian Youth.",
    description:
      "yute.fyi: Connecting Black Canadian Youth with free activities, opportunities, programs and services.",
    image:
      "https://res.cloudinary.com/dligqmt0x/image/upload/v1647905264/yute_banner_1_ranvpu.png",
  };
  const router = useRouter();
  const { user } = useUser();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deletePost = async (id: string) => {
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
    <Container>
      <SEO tagInfo={pageSEO} />
      <Header />
      <Layout>
        {user && submissions && (
          <>
            <TableWrapper>
              <Table>
                <Caption>
                  <h2>My Posts</h2>
                </Caption>
                <Thead>
                  <Tr>
                    <Th>Date Added</Th>
                    <Th>Title</Th>
                    <Th>Clicks</Th>
                    <Th>Copies</Th>
                    <Th>Shares</Th>
                    <Th />
                    <Th />
                  </Tr>
                </Thead>
                <Tbody>
                  {submissions.map((submission) => {
                    const href = `/posts/edit/${submission.id}`;

                    router.prefetch(href);

                    return (
                      <Tr key={submission.id}>
                        <Td>
                          {format(
                            new Date(submission.created as Date),
                            "dd MMM yyyy"
                          )}
                        </Td>
                        <Td>{submission.title}</Td>
                        <Td>{submission.clicks}</Td>
                        <Td>{submission.copies}</Td>
                        <Td>{submission.shares}</Td>
                        <Td>
                          <Link href={href} passHref>
                            <A>Edit</A>
                          </Link>
                        </Td>
                        <Td>
                          <Button onClick={() => deletePost(submission.id)}>
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableWrapper>

            <Link href="/posts/add" passHref>
              <A
                css={{
                  display: "flex",
                  alignSelf: "flex-end",
                  width: "fit-content",
                }}
              >
                Add Post
              </A>
            </Link>
          </>
        )}
      </Layout>
      <Footer />
    </Container>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/login",

  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);

    const { data } = await supabaseServerClient(ctx)
      .from("submissions")
      .select("*")
      .eq("user_id", user.id)
      .order("created", { ascending: false });

    return {
      props: {
        submissions: data,
      },
    };
  },
});

export default Dashboard;
