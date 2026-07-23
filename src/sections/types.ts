export interface SectionBaseProps {
  id?: string;
  className?: string;
}

export interface MediaItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface ButtonAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: React.ReactNode;
}

export interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: MediaItem;
  bio?: string;
  social?: SocialLink[];
}

export interface TestimonialItem {
  name: string;
  role?: string;
  company?: string;
  avatar?: MediaItem;
  content: string;
  rating?: number;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: MediaItem;
  href?: string;
  features?: string[];
}

export interface PortfolioItem {
  title: string;
  category: string;
  image: MediaItem;
  href: string;
  location?: string;
  year?: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  image: MediaItem;
  href: string;
  category: string;
  date: string;
  author?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PartnerItem {
  name: string;
  logo?: MediaItem;
  website?: string;
}

export interface AwardItem {
  title: string;
  organization: string;
  year: string;
  description?: string;
  image?: MediaItem;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: MediaItem;
}

export interface ValueItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: MediaItem;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  social?: SocialLink[];
}

export interface GalleryItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface VideoItem {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  type: "youtube" | "vimeo" | "local";
}

export interface BenefitItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: string;
  href: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  image: MediaItem;
  date: string;
  author?: string;
  category: string;
  slug: string;
}

export interface PricingPlan {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  cta?: string;
}

export type MediaImage = MediaItem;

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: MediaItem;
  images: MediaItem[];
  location?: string;
  year?: string;
  stats?: StatItem[];
  awards?: string[];
}

export interface BusinessHours {
  day: string;
  hours: string;
}

export interface ContactInfoEntry {
  label: string;
  value: string;
  icon?: string;
  href?: string;
}
