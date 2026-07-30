import type { SiteConfig } from "@/types";
import { env } from "./env";

export const siteConfig: SiteConfig = {
  name: "PT KARYA NUSANTARA REALTY",
  description: "Praktik arsitektur dan properti terpercaya di Aceh yang menghadirkan desain hunian mewah, properti komersial premium, resor, dan kawasan terpadu — dari konsep hingga konstruksi, dengan standar internasional.",
  tagline: "Mewujudkan Karya untuk Nusantara",
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
    { platform: "instagram", url: env.socialInstagram, label: "Ikuti Perjalanan Kami di Instagram" },
    { platform: "linkedin", url: env.socialLinkedin, label: "Terhubung di LinkedIn" },
  ],
  navigation: [
    { label: "Beranda", href: "/" },
    { label: "Portofolio", href: "/portfolio" },
    { label: "Layanan", href: "/services" },
    { label: "Tentang", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ],
  footer: [
    {
      title: "Navigasi",
      links: [
        { label: "Beranda", href: "/" },
        { label: "Portofolio", href: "/portfolio" },
        { label: "Layanan", href: "/services" },
        { label: "Tentang Kami", href: "/about" },
        { label: "Kontak", href: "/contact" },
        { label: "Kalkulator", href: "/calculator" },
        { label: "Pencari Proyek", href: "/project-finder" },
      ],
    },
    {
      title: "Layanan",
      links: [
        { label: "Arsitektur Residensial", href: "/services/residential" },
        { label: "Arsitektur Komersial", href: "/services/commercial" },
        { label: "Desain Hospitality", href: "/services/hospitality" },
        { label: "Master Plan", href: "/services/master-planning" },
        { label: "Desain Interior", href: "/services/interior" },
        { label: "Desain Berkelanjutan", href: "/services/sustainable" },
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
    { name: "1969 Architect", description: "Desain Arsitektur & Perencanaan" },
    { name: "1969 Interior", description: "Desain Interior & Furnitur Kustom" },
    { name: "Akaruma Contractor", description: "Konstruksi & Supervisi" },
    { name: "Casara Estate", description: "Konsultan Properti & Media" },
  ],
};
