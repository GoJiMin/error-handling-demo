import { ControllerRenderProps } from "react-hook-form";
import { FormFieldType, FormType } from "../consts/fields";
import { FormSchemaType } from "../consts/rule";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { FormControl } from "@/shared/components/ui/form";

type RenderFieldComponentProps = {
  type: FormFieldType;
  field: ControllerRenderProps<FormSchemaType>;
} & Pick<FormType, "placeholder" | "options">;

const RenderFieldComponent = ({
  field,
  type,
  options,
  placeholder,
}: RenderFieldComponentProps) => {
  switch (type) {
    case "text":
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      );
    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options?.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    default:
      const _exhaustiveCheck: never = type;
      throw new Error(
        `Please check the type of RenderFieldComponent. type: ${_exhaustiveCheck}`
      );
  }
};

export default RenderFieldComponent;
