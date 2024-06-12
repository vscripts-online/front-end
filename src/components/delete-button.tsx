import { cn } from "@/lib/utils";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import LoadingButton from "./loading-button";

type DeleteButtonProps = {
  children: React.ReactNode;
  iconSize?: number;
  className?: string;
};

const DeleteButton = React.forwardRef<
  HTMLButtonElement,
  DeleteButtonProps & React.ComponentProps<typeof LoadingButton>
>((props, ref) => {
  return (
    <LoadingButton
      {...{ ...props }}
      ref={ref}
      className={cn("bg-rose-700 gap-2", props.className)}
    >
      <FaRegTrashAlt size={props.iconSize || 20} />
      {props.children}
    </LoadingButton>
  );
});

DeleteButton.displayName = "BackButton";

export default DeleteButton;
