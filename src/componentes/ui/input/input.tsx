import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import styles from "./input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  hideLabel?: boolean;
  /** Elemento exibido à direita do campo (ex.: um Button). */
  action?: ReactNode;
}

export default function Input({
  id,
  label,
  hideLabel = false,
  action,
  className,
  ...props
}: InputProps) {
  return (
    <div className={className}>
      <label
        className={cx(hideLabel ? styles.visuallyHidden : styles.label)}
        htmlFor={id}
      >
        {label}
      </label>
      <div className={styles.field}>
        <input id={id} className={styles.input} {...props} />
        {action}
      </div>
    </div>
  );
}
