"use client";

import { CTADefault } from "./cta-default";
import type { CTADefaultProps } from "./cta-default";

interface CallToActionProps extends Omit<CTADefaultProps, "align" | "image" | "variant"> {
  variant?: "default" | "brand" | "dark";
}

export function CallToAction(props: CallToActionProps) {
  return <CTADefault {...props} align="center" />;
}
