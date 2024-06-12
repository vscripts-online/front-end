import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type LoadingButtonProps = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
};

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps & React.ComponentProps<typeof Button>
>((props, ref) => {
  return (
    <Button
      {...{ ...props, loading: undefined }}
      ref={ref}
      className={cn("gap-3", props.className)}
    >
      {props.loading && <Loader2 className="animate-spin" size={25} />}
      {props.children}
    </Button>
  );
});

LoadingButton.displayName = "BackButton";

export default LoadingButton;
