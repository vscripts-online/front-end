import { Column, Row } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bytes from "bytes";
import { IKeyValue } from "@/types/file";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPascalCase(str: string) {
  return `${str}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      (_, $2, $3) => `${$2.toUpperCase() + $3}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

export function toKebabCase(string: string) {
  return string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .toLowerCase();
}

export function formatByteRow<T>(row: Row<T>, column: Column<T, unknown>) {
  const size = row.getValue(column.id) as string;
  const formatted = formatByte(size);
  return <div className="font-medium">{formatted}</div>;
}

export function formatByte(size: string) {
  return bytes(parseInt(size), { unitSeparator: " " });
}

export function getErrorMessage(error: any) {
  if (typeof error === "string") {
    return error;
  }

  if (Array.isArray(error)) {
    return getErrorMessage(error[0]);
  }

  if (typeof error === "object") {
    if (error.constraints) {
      const key = Object.keys(error.constraints)[0];
      return error.constraints[key];
    }

    if (typeof error.message === "string") {
      return error.message;
    }

    return getErrorMessage(error.children);
  }
}

export function clearify_headers(headers: IKeyValue[]) {
  return (
    (headers
      .map((header) => {
        const key = header.key.trim();
        const value = header.value;
        if (key) {
          return { key, value };
        }
        return undefined;
      })
      .filter((x) => x) as IKeyValue[]) || []
  );
}
