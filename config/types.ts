export interface SiteConfig {
  name: string;
  description: string;
  navItems: NavItem[];
  navMenuItems: NavMenuItem[];
  baseUrl: string;
  links: Links;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface NavMenuItem {
  label: string;
  href: string;
}

export interface Links {
  github: string;
}
