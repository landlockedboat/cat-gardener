import { SiteConfig } from "./types";

const isProd = process.env.NODE_ENV === "production";

export const siteConfig: SiteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [],
  navMenuItems: [],
  baseUrl: isProd ? "/cat-gardener" : "",
  links: {
    github: "https://github.com/landlockedboat/cat-gardener",
  },
};
