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
    title:
      "yute.fyi - Free activities, and resources for Black Canadian Youth.",
    description:
      "yute.fyi: Connecting Black Canadian Youth with free activities, opportunities, programs and services.",
    image:
      "https://res.cloudinary.com/dligqmt0x/image/upload/v1647905264/yute_banner_1_ranvpu.png",
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
