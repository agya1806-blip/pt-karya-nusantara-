export const cmsConfig = {
  name: "Karya Nusantara CMS",
  version: "1.0.0",
  description: "Enterprise CMS for PT Karya Nusantara Realty",

  modules: [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/admin" },
    { id: "projects", label: "Projects", icon: "Building2", path: "/admin/projects" },
    { id: "services", label: "Services", icon: "Briefcase", path: "/admin/services" },
    { id: "blog", label: "Blog", icon: "FileText", path: "/admin/blog" },
    { id: "team", label: "Team", icon: "Users", path: "/admin/team" },
    { id: "testimonials", label: "Testimonials", icon: "MessageSquare", path: "/admin/testimonials" },
    { id: "faq", label: "FAQ", icon: "HelpCircle", path: "/admin/faq" },
    { id: "pricing", label: "Pricing", icon: "DollarSign", path: "/admin/pricing" },
    { id: "gallery", label: "Gallery", icon: "Image", path: "/admin/gallery" },
    { id: "media", label: "Media Library", icon: "FolderOpen", path: "/admin/media" },
    { id: "navigation", label: "Navigation", icon: "Menu", path: "/admin/navigation" },
    { id: "career", label: "Career", icon: "Briefcase", path: "/admin/career" },
    { id: "forms", label: "Forms", icon: "FileInput", path: "/admin/forms" },
    { id: "newsletter", label: "Newsletter", icon: "Mail", path: "/admin/newsletter" },
    { id: "pages", label: "Pages", icon: "File", path: "/admin/pages" },
    { id: "redirects", label: "Redirects", icon: "ArrowRightLeft", path: "/admin/redirects" },
    { id: "settings", label: "Settings", icon: "Settings", path: "/admin/settings" },
  ] as const,

  contentStatus: ["draft", "published", "archived"] as const,
  userRoles: ["super_admin", "admin", "editor", "author", "marketing"] as const,

  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },

  media: {
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    allowedDocumentTypes: ["application/pdf"],
    maxFileSize: 10 * 1024 * 1024,
    folders: ["/", "/projects", "/services", "/blog", "/team", "/gallery", "/about"],
  },
} as const;

export type CMSModuleId = (typeof cmsConfig.modules)[number]["id"];
export type ContentStatusType = (typeof cmsConfig.contentStatus)[number];
export type UserRoleType = (typeof cmsConfig.userRoles)[number];
