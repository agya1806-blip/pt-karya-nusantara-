export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalServices: number;
  publishedServices: number;
  totalBlogPosts: number;
  publishedBlogPosts: number;
  totalTeamMembers: number;
  totalTestimonials: number;
  totalFAQ: number;
  totalPricingPlans: number;
  unreadSubmissions: number;
  activeSubscribers: number;
  totalMedia: number;
}

export interface DashboardActivity {
  id: string;
  user: { name: string; email: string } | null;
  action: string;
  entityType: string;
  createdAt: string;
}

export interface DashboardQuickAction {
  label: string;
  href: string;
  icon: string;
  description: string;
}
