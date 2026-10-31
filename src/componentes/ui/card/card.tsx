import type { ElementType, HTMLAttributes } from "react";
import { cx } from "../cx";
import styles from "./card.module.css";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export default function Card({
  as: Tag = "div",
  className,
  ...props
}: CardProps) {
  return <Tag className={cx(styles.card, className)} {...props} />;
}
