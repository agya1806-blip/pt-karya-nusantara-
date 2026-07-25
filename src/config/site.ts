import type { SiteConfig } from "@/types";
import { env } from "./env";

export const siteConfig: SiteConfig = {
  name: "PT KARYA NUSANTARA REALTY",
  description: "Konsultan arsitek dan properti terpercaya di Aceh — melayani desain, perencanaan, konstruksi, dan konsultan properti untuk hunian mewah, komersial, dan kawasan terpadu.",
  tagline: "Membangun Karya untuk Nusantara",
  url: env.siteUrl,
  logo: "/images/logo.svg",
  ogImage: "/images/og-default.jpg",
  contact: {
    phone: env.companyPhone,
    email: env.companyEmail,
    address: "Lorong Sawah I, Lambhuk, Kec. Ulee Kareng, Kota Banda Aceh, Aceh 23188",
    mapsUrl: "https://maps.google.com/maps?q=5.561523,95.338814&z=15&output=embed",
  },
  social: [
    { platform: "instagram", url: env.socialInstagram, label: "Ikuti kami di Instagram" },
    { platform: "linkedin", url: env.socialLinkedin, label: "Terhubung di LinkedIn" },
  ],
  navigation: [
    { label: "Beranda", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Layanan", href: "/services" },
    { label: "Tentang", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ],
  footer: [
    {
      title: "Navigasi",
      links: [
        { label: "Portofolio", href: "/portfolio" },
        { label: "Layanan", href: "/services" },
        { label: "Tentang", href: "/about" },
        { label: "Kontak", href: "/contact" },
        { label: "Kalkulator", href: "/calculator" },
        { label: "Pencari Proyek", href: "/project-finder" },
      ],
    },
    {
      title: "Layanan",
      links: [
        { label: "Residensial", href: "/services" },
        { label: "Komersial", href: "/services" },
        { label: "Hospitaliti", href: "/services" },
        { label: "Master Plan", href: "/services" },
      ],
    },
    {
      title: "Ikuti Kami",
      links: [
        { label: "Instagram", href: env.socialInstagram, isExternal: true },
        { label: "LinkedIn", href: env.socialLinkedin, isExternal: true },
      ],
    },
  ],
  businessHours: [
    { day: "Senin", open: "09:00", close: "18:00" },
    { day: "Selasa", open: "09:00", close: "18:00" },
    { day: "Rabu", open: "09:00", close: "18:00" },
    { day: "Kamis", open: "09:00", close: "18:00" },
    { day: "Jumat", open: "09:00", close: "17:00" },
    { day: "Sabtu", open: "09:00", close: "13:00" },
    { day: "Minggu", open: "", close: "", isClosed: true },
  ],
  nib: "2407260005341",
  director: "TEUKU FARIZ WAZDI",
  coordinates: { lat: 5.561523, lng: 95.338814 },
  businessFields: [
    { name: "1969 Architect", description: "Desain & Perencanaan" },
    { name: "1969 Interior", description: "Desain Interior & Furnitur Kustom" },
    { name: "Akaruma Contractor", description: "Bangun & Supervisi" },
    { name: "Casara Estate", description: "Konsultan Properti & Media Properti" },
  ],
};