import type { MediaImage } from "@/sections/types";

export interface LightboxImage extends MediaImage {
  id: string;
  caption?: string;
  category?: string;
}

export interface LightboxConfig {
  loop?: boolean;
  zoomEnabled?: boolean;
  shareEnabled?: boolean;
  downloadEnabled?: boolean;
  showCaption?: boolean;
  thumbnailPosition?: "bottom" | "left" | "right" | "none";
}

export interface ZoomState {
  scale: number;
  position: { x: number; y: number };
  isZoomed: boolean;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  before: MediaImage;
  after: MediaImage;
  description?: string;
}

export interface BeforeAfterConfig {
  defaultPosition?: number;
  orientation?: "horizontal" | "vertical";
  showLabels?: boolean;
  labelBefore?: string;
  labelAfter?: string;
}

export interface FullscreenConfig {
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
  showNavigation?: boolean;
  showThumbnails?: boolean;
  loop?: boolean;
}
