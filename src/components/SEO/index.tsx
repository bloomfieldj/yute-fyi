import Head from "next/head";
import { useRouter } from 'next/router';

// declares types of content in SEO tag info object
type SEOpropTypes = {
  title?: string,
  description?: string,
  image?: string,

}

// declares type of SEO tag info object 
interface Props {
  tagInfo: SEOpropTypes
}


const SEO = ({ tagInfo }: Props) => {

  const router = useRouter();
  const path = router.pathname;
  const url = 'https://www.yute.fyi/'
  const { title, description, image } = tagInfo

  return (
    <Head>
      <title> {title} </title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <meta property="og:url" content={`${url}${path}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

export default SEO;