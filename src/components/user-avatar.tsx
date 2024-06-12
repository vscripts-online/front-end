"use client";

import { AUTH_HOST } from "@/auth";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  avatar?: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  imgClassName?: HTMLAttributes<HTMLImageElement>["className"];
  size?: number;
}

export default function UserAvatar(props: Props) {
  const avatar = props.avatar || AUTH_HOST + "/user.png";
  const size = props.size || 50;
  const classname = props.className || "";
  const imgClassname = props.imgClassName || "";

  return (
    <div className={twMerge(`size-[${size}px] ${classname}`)}>
      <img
        src={avatar}
        alt="avatar"
        className={`rounded-full !relative border-2 border-sky-950 ${imgClassname}`}
        sizes={`${size}px`}
      />
    </div>
  );
}
