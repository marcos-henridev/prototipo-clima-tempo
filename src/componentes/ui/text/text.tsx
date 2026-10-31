import type { ElementType, HTMLAttributes } from "react";
import { cx } from "../cx";
import styles from "./text.module.css";

type Variant = "eyebrow" | "title" | "subtitle" | "body" | "caption";

const defaultTag: Record<Variant, ElementType> = {
  eyebrow: "p",
  title: "h2",
  subtitle: "h3",
  body: "p",
  caption: "p",
};

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: Variant;
}

export default function Text({
  as,
  variant = "body",
  className,
  ...props
}: TextProps) {
  const Tag = as ?? defaultTag[variant];
  return <Tag className={cx(styles[variant], className)} {...props} />;
}
