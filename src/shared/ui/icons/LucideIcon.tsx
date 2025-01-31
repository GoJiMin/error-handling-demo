import { cn } from "@/shared/lib/utils/cn";
import { icons } from "lucide-react";
import { HTMLAttributes } from "react";

type LucideIconProps = HTMLAttributes<HTMLOrSVGElement> & {
  name: keyof typeof icons;
  color?: string;
  size: number;
};

const LucideIcon = ({ name, color, size, ...props }: LucideIconProps) => {
  const SelectLucideIcon = icons[name];

  const isClickEvent = !!props.onClick;
  const pointerStyle = isClickEvent ? "cursor-pointer" : "";

  return (
    <SelectLucideIcon
      color={color}
      size={size}
      className={cn(pointerStyle, props.className)}
      {...props}
    />
  );
};

export default LucideIcon;
