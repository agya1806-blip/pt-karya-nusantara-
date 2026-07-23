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
    return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  }

  get siteName(): string {
    return process.env.NEXT_PUBLIC_SITE_NAME ?? "PT Karya Nusantara Realty";
  }

  get siteDescription(): string {
    return (
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
      "World-class luxury architecture firm"
    );
  }

  get companyPhone(): string {
    return process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "";
  }

  get companyEmail(): string {
    return process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "";
  }

  get companyAddress(): string {
    return process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "";
  }

  get socialInstagram(): string {
    return process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "";
  }

  get socialLinkedin(): string {
    return process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "";
  }

  get googleSiteVerification(): string {
    return process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";
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
