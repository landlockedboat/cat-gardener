import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";

export const Head = () => {
  return (
    <NextHead>
      <title key="title">{siteConfig.name}</title>
      <meta key="og-title" content={siteConfig.name} property="og:title" />
      <meta
        key="description"
        content={siteConfig.description}
        name="description"
      />
      <meta
        key="og-description"
        content={siteConfig.description}
        property="og:description"
      />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
    </NextHead>
  );
};
