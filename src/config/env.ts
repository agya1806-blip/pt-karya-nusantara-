class EnvironmentConfig {
  private static instance: EnvironmentConfig;

  private constructor() {}

  static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  get siteUrl(): string {
    return (
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : undefined) ??
      "http://localhost:3000"
    );
  }

  get siteName(): string {
    return "PT Karya Nusantara Realty";
  }

  get siteDescription(): string {
    return "World-class luxury architecture firm crafting timeless spaces";
  }

  get companyPhone(): string {
    return "+62 21 1234 5678";
  }

  get companyEmail(): string {
    return "hello@karyanusantara.com";
  }

  get companyAddress(): string {
    return "Jakarta, Indonesia";
  }

  get socialInstagram(): string {
    return "https://instagram.com/karyanusantara";
  }

  get socialLinkedin(): string {
    return "https://linkedin.com/company/karyanusantara";
  }

  get nib(): string {
    return "2407260005341";
  }

  get googleSiteVerification(): string {
    return "";
  }

  get isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  }

  get isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
  }

  get isServer(): boolean {
    return typeof window === "undefined";
  }

  get isClient(): boolean {
    return !this.isServer;
  }
}

export const env = EnvironmentConfig.getInstance();
