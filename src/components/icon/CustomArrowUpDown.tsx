import { createLucideIcon, ArrowUpDown } from "lucide-react";
import { CSSProperties, ComponentPropsWithoutRef } from "react";

type CustomArrowUpDownProps = ComponentPropsWithoutRef<typeof ArrowUpDown> & {
  leftColor?: CSSProperties["color"];
  rightColor?: CSSProperties["color"];
};

const CustomArrowUpDown = ({
  leftColor,
  rightColor,
  ...props
}: CustomArrowUpDownProps) => {
  const Component = createLucideIcon("CustomArrowUpDown", [
    [
      "path",
      {
        d: "m21 16-4 4-4-4",
        key: "f6ql7i",
        color: rightColor || "currentColor",
      },
    ],
    [
      "path",
      { d: "M17 20V4", key: "1ejh1v", color: rightColor || "currentColor" },
    ],
    [
      "path",
      { d: "m3 8 4-4 4 4", key: "11wl7u", color: leftColor || "currentColor" },
    ],
    [
      "path",
      { d: "M7 4v16", key: "1glfcx", color: leftColor || "currentColor" },
    ],
  ]);

  return <Component {...props} />;
};

export default CustomArrowUpDown;
