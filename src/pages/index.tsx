import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { styled } from "stitches.config";
import Hero from "../components/Hero";
import CTA from "../components/CTA";
import Layout from "../components/Design-system/Layout";
import CardSection from "../components/Design-system/CardBox";
import { CardTypes } from "../components/Design-system/Card";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getStaticProps() {
  const { data, error } = await supabaseClient
    .from("submissions")
    .select("*")
    .eq("active", true)
    .order("id", { ascending: false });

  if (error) console.log("error", error.message);

  return {
    props: {
      submissions: data,
    },
  };
}

const Container = styled("div", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

const Home = ({ submissions }: { submissions: CardTypes[] }) => {
  const pageSEO = {
    title: "FNDRS.fyi | Helping support Black Canadian Founders.",
    description:
      "FNDRS.fyi is a community platform connecting Black Canadian Founders with the opportunities out there waiting for them. It takes a village.",
    image:
      "https://res.cloudinary.com/dligqmt0x/image/upload/v1661320004/fndrs_banner_i5zh0f.png",
  };

  return (
    <Container>
      <SEO tagInfo={pageSEO} />
      <Header />
      <Layout>
        <Hero />
        <CardSection submissions={submissions} />
        <CTA />
      </Layout>
      <Footer />
    </Container>
  );
};

export default Home;
