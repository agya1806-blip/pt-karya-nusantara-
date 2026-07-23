export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  isExternal?: boolean;
  isHighlighted?: boolean;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  mapsUrl?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  tagline: string;
  url: string;
  logo: string;
  ogImage: string;
  contact: ContactInfo;
  social: SocialLink[];
  navigation: NavigationItem[];
  footer: FooterSection[];
  businessHours: BusinessHours[];
}
