import { groq } from "next-sanity";
import { client } from "./client";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";

export interface SanityHero {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: SanityImageObject;
  ctaButtons?: { label: string; href: string; variant: "primary" | "outline" }[];
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description?: string;
  location?: string;
  year?: string;
  thumbnail?: SanityImageObject;
  images?: SanityImageObject[];
  featured?: boolean;
}

export interface SanityService {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image?: SanityImageObject;
  features?: string[];
}

export interface SanityTestimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  avatar?: SanityImageObject;
  rating?: number;
}

export interface SanityTeam {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: SanityImageObject;
}

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  image?: SanityImageObject;
  category: string;
  date: string;
  author?: string;
}

export interface SanitySiteSettings {
  title: string;
  description: string;
  logo?: SanityImageObject;
  contact: {
    phone: string;
    email: string;
    address: string;
    mapsUrl: string;
  };
  social: {
    instagram: string;
    linkedin: string;
  };
  businessHours: { day: string; hours: string }[];
}

const heroQuery = groq`*[_type == "hero"][0]{
  title, subtitle, description, backgroundImage, ctaButtons
}`;

const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc) {
  _id, title, slug, category, description, location, year, thumbnail, featured
}`;

const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id, title, slug, description, image, features
}`;

const testimonialsQuery = groq`*[_type == "testimonial"] {
  _id, name, role, company, content, avatar, rating
}`;

const teamQuery = groq`*[_type == "team"] | order(order asc) {
  _id, name, role, bio, image
}`;

const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

const blogPostsQuery = groq`*[_type == "blog"] | order(date desc) {
  _id, title, slug, excerpt, image, category, date, author
}`;

const allProjectsQuery = groq`*[_type == "project"] | order(order asc) {
  _id, title, slug, category, description, location, year, thumbnail, images, featured
}`;

export async function getHero() {
  return client.fetch<SanityHero>(heroQuery);
}

export async function getFeaturedProjects() {
  return client.fetch<SanityProject[]>(featuredProjectsQuery);
}

export async function getServices() {
  return client.fetch<SanityService[]>(servicesQuery);
}

export async function getTestimonials() {
  return client.fetch<SanityTestimonial[]>(testimonialsQuery);
}

export async function getTeam() {
  return client.fetch<SanityTeam[]>(teamQuery);
}

export async function getSiteSettings() {
  return client.fetch<SanitySiteSettings>(siteSettingsQuery);
}

export async function getBlogPosts() {
  return client.fetch<SanityBlogPost[]>(blogPostsQuery);
}

export async function getAllProjects() {
  return client.fetch<SanityProject[]>(allProjectsQuery);
}
