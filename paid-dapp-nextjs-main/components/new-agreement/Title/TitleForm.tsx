import { ErrorMessage } from "@hookform/error-message";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "reactstrap";
import styles from "./TitleForm.module.scss";

export interface TitleFormProps {
  agreementTitle: string;
  onSubmit: SubmitHandler<any>;
  onCancel(): void;
}

export function TitleForm({
  agreementTitle,
  onCancel,
  onSubmit,
}: TitleFormProps) {
  const { register, errors, handleSubmit } = useForm();

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <input
        name="title"
        type="text"
        placeholder="Enter your title"
        defaultValue={agreementTitle}
        ref={register({
          required: "Title is required",
        })}
      />
      <ErrorMessage
        className="error-message"
        name="title"
        as="div"
        errors={errors}
      />
      <Button type="submit" className={styles.button}>
        <Image src="/assets/icon/check.svg" width={15} height={15} />
      </Button>
      <Button onClick={onCancel} className={styles.button}>
        <Image src="/assets/icon/close.svg" width={15} height={15} />
      </Button>
    </form>
  );
}
