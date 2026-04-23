import type {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import type { FieldType } from "../type/form.type";


export interface DynamicInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: FieldType | undefined;
  rows?: number;
  required?: boolean;

  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}