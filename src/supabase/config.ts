const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  storage: {
    buckets: {
      media: "media",
      avatars: "avatars",
      documents: "documents",
    },
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    allowedDocumentTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    allowedVideoTypes: ["video/mp4", "video/webm"],
  },
  auth: {
    redirectUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    sessionDuration: 60 * 60 * 24 * 7, // 7 days
  },
} as const;

export default supabaseConfig;
