import type { BaseEntity, LeadStatus, BookingStatus, ApplicationStatus, ConsultationType } from "./base";

export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  area_size: string | null;
  budget: string | null;
  message: string;
  preferred_contact: string;
  lead_status: LeadStatus;
  assigned_to: string | null;
  notes: string | null;
  source: string;
  read_at: string | null;
  replied_at: string | null;
}

export interface ConsultationRequest extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  project_type: string | null;
  consultation_type: ConsultationType;
  preferred_date: string | null;
  preferred_time: string | null;
  duration: number;
  notes: string | null;
  lead_status: LeadStatus;
  assigned_to: string | null;
  source: string;
}

export interface Lead extends BaseEntity {
  source: string;
  source_id: string | null;
  source_type: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  budget: number | null;
  area_size: number | null;
  message: string | null;
  status: LeadStatus;
  assigned_to: string | null;
  notes: string | null;
  score: number;
  converted_at: string | null;
}

export interface NewsletterSubscriber extends BaseEntity {
  email: string;
  name: string | null;
  interests: string[];
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
  source: string;
}

export interface Booking extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  project_type: string | null;
  consultation_type: ConsultationType;
  preferred_date: string;
  preferred_time: string;
  duration: number;
  notes: string | null;
  status: BookingStatus;
  assigned_to: string | null;
  confirmed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
}

export interface JobCategory extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface JobPosition extends BaseEntity, SoftDeletable {
  title: string;
  slug: string;
  category_id: string | null;
  type: string;
  location: string | null;
  is_remote: boolean;
  salary_range: string | null;
  description: string | null;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: EntityStatus;
  sort_order: number;
  expires_at: string | null;
  published_at: string | null;
  created_by: string | null;
}

export interface CareerApplication extends BaseEntity {
  job_id: string;
  name: string;
  email: string;
  phone: string | null;
  cover_letter: string | null;
  resume_url: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  source: string;
  status: ApplicationStatus;
  notes: string | null;
}
import type { SoftDeletable, EntityStatus } from "./base";
