// components/ui/icon.tsx
import { createElement } from "react";
import * as LucideIcons from "lucide-react";

export type IconName = keyof typeof LucideIcons;

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  className?: string;
}

export function Icon({ name, className, ...props }: IconProps) {
  const IconComponent = LucideIcons[name] as React.ElementType;
  return createElement(IconComponent, {
    className: `h-5 w-5 ${className || ""}`,
    ...props
  });
}

// Optional: Re-export all Lucide icons for direct access
export * as Icons from "lucide-react";