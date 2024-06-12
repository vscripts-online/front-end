import { AccountTypes } from "@/types/account";
import { z } from "zod";

export const accountCreateFormSchema = z.object({
  type: z.nativeEnum(AccountTypes).default(AccountTypes.GOOGLE),
  label: z.string().describe("Account label ex. email").optional(),
  client_id: z.string({ required_error: "Client_id is required" }),
  client_secret: z.string({ required_error: "Client_secret is required" }),
});