import { SiteConfig } from "./types";

const isProd = process.env.NODE_ENV === "production";

export const siteConfig: SiteConfig = {
  name: "Plants for Pets",
  description:
    "Learn which plants are safe for your pet and build a safe garden for them!",
  navItems: [{ label: "About", href: "/about" }],
  navMenuItems: [],
  baseUrl: isProd ? "/cat-gardener" : "",
  links: {
    github: "https://github.com/landlockedboat/cat-gardener",
  },
};
