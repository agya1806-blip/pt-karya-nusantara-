import type { SiteConfig } from "@/types";
import { env } from "./env";

export const siteConfig: SiteConfig = {
  name: "PT Karya Nusantara Realty",
  description:
    "World-class luxury architecture firm crafting timeless spaces that inspire and endure. Based in Jakarta, serving globally.",
  tagline: "Crafting Timeless Architecture",
  url: env.siteUrl,
  logo: "/images/logo.svg",
  ogImage: "/images/og-default.jpg",

  contact: {
    phone: env.companyPhone,
    email: env.companyEmail,
    address: env.companyAddress,
    mapsUrl: "https://maps.google.com/?q=Jakarta+Indonesia",
  },

  social: [
    {
      platform: "instagram",
      url: env.socialInstagram,
      label: "Follow us on Instagram",
    },
    {
      platform: "linkedin",
      url: env.socialLinkedin,
      label: "Connect on LinkedIn",
    },
  ],

  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Portfolio",
      href: "/portfolio",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],

  footer: [
    {
      title: "Navigation",
      links: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Residential", href: "/services/residential" },
        { label: "Commercial", href: "/services/commercial" },
        { label: "Hospitality", href: "/services/hospitality" },
        { label: "Master Planning", href: "/services/master-planning" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Instagram", href: env.socialInstagram, isExternal: true },
        { label: "LinkedIn", href: env.socialLinkedin, isExternal: true },
      ],
    },
  ],

  businessHours: [
    { day: "Monday", open: "09:00", close: "18:00" },
    { day: "Tuesday", open: "09:00", close: "18:00" },
    { day: "Wednesday", open: "09:00", close: "18:00" },
    { day: "Thursday", open: "09:00", close: "18:00" },
    { day: "Friday", open: "09:00", close: "17:00" },
    { day: "Saturday", open: "09:00", close: "13:00" },
    { day: "Sunday", open: "", close: "", isClosed: true },
  ],
};
