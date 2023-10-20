import React from "react";
import Head from "next/head";

type MetaSettings = {
  title?: string,
  og_title?: string,
  twitter_title?: string,
  description?: string,
  og_description?: string,
  twitter_description?: string,
  keywords?: string,
  og_image?: string,
}


const Meta = (meta: MetaSettings) => {
  return (
    <Head>
      <meta name="theme-color" content="#FFFFFF" />

      <title>{meta.title ?? "Notifications"}</title>
      {meta.og_title && <meta name="og:title" property="og:title" content={meta.og_title} />}
      {meta.twitter_title && <meta name="twitter:title" content={meta.twitter_title} />}

      {meta.description && <meta name="description" content={meta.description} />}
      {meta.og_description && <meta name="og:description" content={meta.og_description} />}
      {meta.twitter_description && <meta name="twitter:description" content={meta.twitter_description} />}

      {meta.keywords && <meta name="keywords" content={meta.keywords} />}

      <meta name="og:image" content={"https://assets-global.website-files.com/62da00c367f1ce888a0c9fdd/651b255406318f3be544a14c_new_header.svg"} />
    </Head>
  );
};

export default Meta;
