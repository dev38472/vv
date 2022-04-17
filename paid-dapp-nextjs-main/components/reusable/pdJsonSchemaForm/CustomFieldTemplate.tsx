import { FieldTemplateProps } from "@rjsf/core";
import styles from "./CustomFieldTemplate.module.scss";

export function CustomFieldTemplate({
  id,
  classNames,
  label,
  help,
  description,
  errors,
  children,
}: FieldTemplateProps) {
  return (
    <div className={`${styles.container} ${classNames}`}>
      {id !== 'root' && <label htmlFor={id}>{label}</label>}
      {children}
      {description}
      {errors}
      {help}
    </div>
  );
}
