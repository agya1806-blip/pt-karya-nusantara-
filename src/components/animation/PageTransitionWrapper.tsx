"use client";

import { PageTransition } from "./PageTransition";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  return <PageTransition>{children}</PageTransition>;
}
