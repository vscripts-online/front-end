import { IUser } from "@/auth";
import { IKeyValue } from "@/types/file";
import { QueryClient } from "@tanstack/react-query";
import { Column, Row } from "@tanstack/react-table";
import bytes from "bytes";

export function generateAuthCallbackURL() {
  const url = new URL(location.href);
  return url.toString();
}

export function getErrorMessage(error: any) {
  console.log("getErrorMessage", error);
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

export function toKebabCase(string: string) {
  return string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .toLowerCase();
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

export function formatByteRow<T>(row: Row<T>, column: Column<T, unknown>) {
  const size = row.getValue(column.id) as string;
  const formatted = formatByte(size);
  return <div className="font-medium">{formatted}</div>;
}

export function formatByte(size: string) {
  return bytes(parseInt(size), { unitSeparator: " " });
}

export function localeDate(date: number | string | Date) {
  return new Date(date).toLocaleString();
}

export function increaseUserMetadataSizes(
  queryClient: QueryClient,
  key: "used" | "total",
  size: number
) {
  key;
  queryClient.setQueryData(["authAPIQuery.GetMe"], (oldData: IUser) => ({
    ...oldData,
    metadata: { ...oldData.metadata, [key]: oldData.metadata![key]! + size },
  }));
}

export function byte(value: number) {
  return bytes(value, { decimalPlaces: 2, unitSeparator: " " });
}
