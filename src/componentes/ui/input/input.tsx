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
      <div className={cx(styles.field, action != null && styles.comAction)}>
        <input id={id} className={styles.input} {...props} />
        {action != null && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  );
}
