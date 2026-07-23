export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface BaseComponentProps extends BaseProps {
  id?: string;
  lang?: string;
}

export interface WithAnimation {
  animate?: boolean;
  delay?: number;
  duration?: number;
}

export interface WithTestId {
  "data-testid"?: string;
}

export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type Orientation = "landscape" | "portrait" | "square";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type Direction = "ltr" | "rtl";
