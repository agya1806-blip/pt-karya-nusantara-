import type { NavigationItem } from "./site";

export interface NavigationState {
  isOpen: boolean;
  isScrolled: boolean;
  isTop: boolean;
  activeItem: string | null;
}

export interface NavigationActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
  setActive: (href: string) => void;
}

export interface NavigationContextValue {
  state: NavigationState;
  actions: NavigationActions;
  items: NavigationItem[];
}
